import { BrowserCheck, Frequency } from "checkly/constructs";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

new BrowserCheck(`login-context`, {
  name: "login context",
  frequency: Frequency.EVERY_10M,
  code: {
    entrypoint: path.join(__dirname, "../tests/login.spec.ts"),
  },
  environmentVariables: [
    { key: "API_KEY", value: `${process.env.API_KEY}` },
    { key: "CHECKLY_ACCOUNT_ID", value: `${process.env.CHECKLY_ACCOUNT_ID}` },
  ],
});

new BrowserCheck(`create-and-delete-article`, {
  name: `create and delete article`,
  frequency: Frequency.EVERY_10M,
  code: {
    entrypoint: path.join(__dirname, "../tests/crud-article.spec.ts"),
  },
});
