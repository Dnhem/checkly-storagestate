import { test, test as setup } from "@playwright/test";
import { createChecklyContext } from "./utils/createChecklyContext";

setup("login credentials", async ({ page, baseURL }) => {
  const context = await createChecklyContext(
    process.env.API_KEY,
    process.env.CHECKLY_ACCOUNT_ID
  );

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

  //   endpoint reached (Page loading complete)
  await page.waitForResponse(`${process.env.PAGE_URL}`);

  //   capture snapshot of local storage
  const storage = await page.context().storageState();
  //   stringify the storage to format for checkly API
  const stringifiedStorage = JSON.stringify(storage);

  // update env variable with stringified storage
  await context.put(`variables/STORAGE_STATE`, {
    data: {
      key: "STORAGE_STATE",
      value: `${stringifiedStorage}`,
    },
  });
});
