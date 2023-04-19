import { test, expect } from "@playwright/test";

test("Should return 401 responses when entering image links when not logged in, and when user is logged in, it should return 200 responses when entering image link", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByText("FaceAI").click();
  await page.getByPlaceholder("Add image url").click();
  await page.waitForTimeout(3000);
  await page
    .getByPlaceholder("Add image url")
    .fill(
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
    );
  await page.waitForResponse((response) => response.status() === 401);
  await page.waitForTimeout(3000);
  await page.getByRole("button").nth(1).click();
  await page.getByPlaceholder("Add image url").click();
  await page.waitForTimeout(3000);
  await page
    .getByPlaceholder("Add image url")
    .fill(
      "https://images.pexsels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
    );
  await page.waitForResponse((response) => response.status() === 401);
  await page.waitForTimeout(4000);
  await page.getByRole("button").nth(1).click();
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Sign in with GitHub" }).click();
  await page.getByLabel("Username or email address").click();
  await page.getByLabel("Username or email address").fill("USERNAME HERE");
  await page.getByLabel("Username or email address").press("Tab");
  await page.getByLabel("Password").fill("PASSWORD HERE");
  await page.getByLabel("Password").press("Enter");
  await page.waitForTimeout(15000);
  await page.goto("http://localhost:3000/face-ai");

  await page.getByPlaceholder("Add image url").click();
  await page
    .getByPlaceholder("Add image url")
    .fill(
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
    );
  await page.waitForResponse((response) => response.status() === 200);
  await page.waitForTimeout(4000);
  await page.getByRole("button").click();

  await page.getByPlaceholder("Add image url").click();

  await page
    .getByPlaceholder("Add image url")
    .fill(
      "https://images.pexsels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
    );
  await page.waitForResponse((response) => response.status() === 200);
  await page.waitForTimeout(4000);
  await page.getByRole("button").click();
  await page
    .getByRole("img", {
      name: "https://avatars.githubusercontent.com/u/96228699?v=4",
    })
    .click();
});
