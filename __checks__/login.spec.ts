import { test as setup } from "@playwright/test";

setup("login credentials", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`, {
    waitUntil: "networkidle",
  });
  await page.getByText("Sign in").click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill(`${process.env.USER_NAME}`);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(`${process.env.PASSWORD}`);
  await page.getByRole("button").click();

  // optional status code 200 assertion, etc. can go below
});
