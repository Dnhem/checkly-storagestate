import { test as setup } from "@playwright/test";

setup("auth credentials", async ({ page, request }) => {
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: { email: "deebo@gmail.com", password: "Whatever415!" },
      },
    }
  );

  const responseBody = await response.json();

  await request.post("https://api.checklyhq.com/v1/variables", {
    data: {
      locked: false,
      key: "loginToken",
      value: responseBody,
    },
    headers: {
      "x-checkly-account": "178e901c-9e80-465b-b3a9-5a8a881278b0",
      Authorization: "Bearer cu_a04f2bb0a6df44008772cd3bafd6b921",
    },
  });
});
