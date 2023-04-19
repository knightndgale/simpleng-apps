import { test, expect } from "@playwright/test";

test("Should be able to login, create new topic, new note title, and new note text twice and then log out", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("button", { name: "Sign in with GitHub" }).click();
  await page.getByLabel("Username or email address").click();
  await page.getByLabel("Username or email address").fill("USERNAME HERE");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("PASSWORD HERE");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForTimeout(10000);
  await page.getByPlaceholder("New Topic").click();
  await page.getByPlaceholder("New Topic").fill("Sample topic 9");
  await page.getByPlaceholder("New Topic").press("Enter");
  await page.getByRole("link", { name: "Sample topic 9" }).click();
  await page.getByPlaceholder("Note title").click();
  await page.getByPlaceholder("Note title").fill("Sample title 9");
  await page.locator("div").filter({ hasText: /^91›$/ }).nth(3).click();
  await page.getByRole("textbox").nth(2).fill("note text 9");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByPlaceholder("New Topic").click();
  await page.getByPlaceholder("New Topic").fill("Sample topic 10");
  await page.getByPlaceholder("New Topic").press("Enter");
  await page.getByRole("link", { name: "Sample topic 10" }).click();
  await page.getByPlaceholder("Note title").click();
  await page.getByPlaceholder("Note title").fill("Sample title 10");
  await page.locator("div").filter({ hasText: /^91›$/ }).nth(3).click();
  await page.getByRole("textbox").nth(2).fill("note text 10");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("link", { name: "Sample topic 9" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("link", { name: "Sample topic 10" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page
    .getByRole("img", {
      name: "https://avatars.githubusercontent.com/u/96228699?v=4",
    })
    .click();
});
