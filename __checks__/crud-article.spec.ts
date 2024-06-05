import { test } from "@playwright/test";
import { retrieveStorageState } from "./utils/retrieveStorageState";

let storageState;

test.beforeAll(async () => {
  storageState = await retrieveStorageState();
});

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  // set storageState in localStorage
  await page.evaluate(({ name, value }) => {
    localStorage.setItem(name, value);
  }, storageState);
  // reload page to make links only visible to a logged in user
  await page.reload({ waitUntil: "domcontentloaded" });
});

test("create article", async ({ page }) => {
  await page.getByText("New Article").click();
  await page
    .getByRole("textbox", { name: "Article Title" })
    .fill("Playwright is awesome");
  await page
    .getByRole("textbox", { name: "What's this article about?" })
    .fill("About Playwright");
  await page
    .getByRole("textbox", { name: "Write your article (in markdown)" })
    .fill("We like to use Playwright for automation");
  await page.getByRole("button", { name: "Publish Article" }).click();
});
