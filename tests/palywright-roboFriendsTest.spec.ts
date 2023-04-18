import { test, expect } from "@playwright/test";

test("This test should return a response 200 which indicates pulling data is successful upon entering robofriends and upon emptying search input field ", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Sign in with GitHub" }).click();
  await page.getByLabel("Username or email address").fill("tjvllbn");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("");
  await page.getByLabel("Password").press("Enter");
  await page.waitForTimeout(10000);
  await page.goto("http://localhost:3000/");
  await page.getByText("Robofriends").click();
  await page.waitForResponse((response) => response.status() === 200);
  await page.getByPlaceholder("Search").click();
  await page.getByPlaceholder("Search").fill("m");
  await page.getByPlaceholder("Search").fill("");
  await page.waitForResponse((response) => response.status() === 200);
  await page.getByPlaceholder("Search").fill("j");
  await page.getByPlaceholder("Search").fill("");
  await page.waitForResponse((response) => response.status() === 200);
  await page.locator("html").click();
  await page
    .locator("div")
    .filter({ hasText: "tjvllbntjvllbn@gmail.com" })
    .nth(3)
    .click();
});
