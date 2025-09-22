import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import handlebars from "handlebars";
import axios from "axios";
import FormData from "form-data";
import { Section } from "@/lib/types/analysis-type";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body: { name: string; email: string; sections: Section[] } =
    await req.json();

  const templatePath = path.join(process.cwd(), "templates", "report.hbs");
  const templateFile = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateFile);

  const html = template({
    recipientName: body.name,
    choicesText: "Choices content...",
    growWithUs: "Inspirasi Satu Indonesia Coaching",
    contact: { phone: "+62 123456789", website: "denovamind.com" },
    sections: body.sections,
  });
  try {
    const browser = await puppeteer.launch({
      headless: "shell",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="text-align: center; width: 100%; font-size: 10px; padding-top: 81px; padding-bottom: 50px;">Copyright © ${new Date().getFullYear()} DENOVA MIND. All Rights Reserved</div>`,
      margin: {
        top: 50,
        left: 50,
        right: 50,
        bottom: 131,
      },
    });
    await browser.close();

    const form = new FormData();
    form.append("file", Buffer.from(pdfBuffer), {
      filename: "report.pdf",
      contentType: "application/pdf",
    });
    form.append("email", body.email);
    form.append("name", body.name);

    const { data } = await axios.post(
      `${process.env.WORKFLOW_BASE_URL}/webhook/mailer`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
