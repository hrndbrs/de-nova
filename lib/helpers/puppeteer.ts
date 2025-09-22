import type { LaunchOptions } from "puppeteer-core";

export async function getBrowser(launchOptions: LaunchOptions) {
  let puppeteer;
  const isVercel = !!process.env.VERCEL_ENV;

  if (isVercel) {
    const chromium = (await import("@sparticuz/chromium")).default;
    puppeteer = await import("puppeteer-core");
    launchOptions = {
      ...launchOptions,
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      defaultViewport: null,
      headless: true,
    };
  } else {
    puppeteer = await import("puppeteer");
  }

  const browser = await puppeteer.launch(launchOptions);

  return browser;
}
