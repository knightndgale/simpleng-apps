import { test, expect } from "@playwright/test";

test("Should return a 401 response when creating note title and note text when user is not logged in", async ({
  page,
}) => {
  await page.goto("about:blank");
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("Note title").click();
  await page.getByPlaceholder("Note title").fill("Title input sample");
  await page.getByPlaceholder("Note title").press("Tab");
  await page.getByRole("textbox").nth(2).fill("Note input sample");
  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForResponse((response) => response.status() === 401);
});
