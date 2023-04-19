import { test, expect } from "@playwright/test";

test("Should return a 401 response when creating a topic when user is not logged in", async ({
  page,
}) => {
  await page.goto("about:blank");
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("New Topic").click();
  await page.getByPlaceholder("New Topic").click();
  await page.getByPlaceholder("New Topic").fill("Create topic test");
  await page.getByPlaceholder("New Topic").press("Enter");
  await page.waitForResponse((response) => response.status() === 401);
});
