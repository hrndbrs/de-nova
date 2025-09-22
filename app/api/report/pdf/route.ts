import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import handlebars from "handlebars";
import { api } from "@/config/api";
import FormData from "form-data";
import type { Section } from "@/lib/types/analysis-type";
import type { Domain } from "@bigfive-org/results";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body: {
      id: string;
      name: string;
      email: string;
      sections: Section[];
      report: Domain[];
    } = await req.json();

    const templatePath = path.join(process.cwd(), "templates", "report.hbs");
    const templateFile = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(templateFile);

    const html = template({
      recipientName: body.name,
      contact: {
        phone: "+62 123456789",
        website: "denovamind.com",
        email: "contact@denovamind.com",
      },
      sections: body.sections,
      report: body.report,
    });
    const browser = await puppeteer.launch({
      headless: "shell",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      width: "595px",
      height: "842px",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="text-align: center; width: 100%; font-size: 10px; padding-top: 81px; padding-bottom: 50px;">Copyright © ${new Date().getFullYear()} DENOVA MIND. All Rights Reserved</div>`,
      margin: {
        top: "50px",
        left: "50px",
        right: "50px",
        bottom: "131px",
      },
    });
    await browser.close();

    const form = new FormData();
    form.append("file", Buffer.from(pdfBuffer), {
      filename: `bigfive-report-analysis_${body.id}.pdf`,
      contentType: "application/pdf",
    });
    form.append("email", body.email);
    form.append("name", body.name);

    api.post("/webhook/mailer", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    let code = 500;
    let message = "Internal Server Error";

    if (error instanceof Error) {
      message = error.message;
    }
    return Response.json(
      { message, code },
      {
        status: code,
      },
    );
  }
}
