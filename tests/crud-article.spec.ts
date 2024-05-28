import { test, expect } from "@playwright/test";
import { retrieveStorageState } from "../__checks__/utils/retrieveStorageState";

let storageState;

test.beforeEach(async ({ page }) => {
  // retrieve StorageState
  const currentStorageState = await retrieveStorageState();
  console.log(">>>>>>>>CURRENT STORAGE STATE:", currentStorageState);
  storageState = await page.context().storageState(currentStorageState);
});

test("create article", async ({ page, request }) => {
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

  await page.getByText("Home").click();
  await page.getByText("Global Feed").click();
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "Playwright is awesome"
  );
});

test("delete article", async ({ page }) => {
  await page.getByText("Global Feed").click();

  await page.getByText("Playwright is awesome").click();
  await page.getByRole("button", { name: "Delete Article" }).first().click();

  await page.getByText("Global Feed").click();
});
