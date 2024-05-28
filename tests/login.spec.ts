import { test as setup } from "@playwright/test";
import { createChecklyContext } from "../__checks__/utils/createChecklyContext";

setup("login credentials", async ({ page, baseURL }) => {
  const context = await createChecklyContext(
    process.env.API_KEY,
    process.env.CHECKLY_ACCOUNT_ID
  );

  await page.goto(`${baseURL}`, {
    waitUntil: "networkidle",
  });
  await page.getByText("Sign in").click();
  await page.getByRole("textbox", { name: "Email" }).fill("deebo@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Whatever415!");
  await page.getByRole("button").click();

  //   endpoint reached (Page loading complete)
  await page.waitForResponse("https://conduit-api.bondaracademy.com/api/tags");

  //   capture snapshot of local storage
  const storage = await page.context().storageState();
  //   stringify the storage to format for checkly API
  const stringifiedStorage = JSON.stringify(storage);
  console.log(">>>>>>>>>STRINGIFIED STORAGE:", stringifiedStorage);

  // update env variable with stringified storage
  await context.put(`variables/STORAGE_STATE`, {
    data: {
      key: "STORAGE_STATE",
      value: `${stringifiedStorage}`,
    },
  });
});
