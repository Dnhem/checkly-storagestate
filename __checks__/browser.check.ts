import { BrowserCheck, CheckGroup, Frequency } from "checkly/constructs";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

const group = new CheckGroup("check-group-1", {
  name: "Group",
  activated: true,
  locations: ["us-east-1", "eu-west-1"],
  tags: ["login-group"],
  concurrency: 10,
});

new BrowserCheck(`login-check`, {
  name: "login check",
  group,
  tags: ["check"],
  frequency: Frequency.EVERY_10M,
  code: {
    entrypoint: path.join(__dirname, "./login.spec.ts"),
  },
  environmentVariables: [
    { key: "USERNAME", value: `${process.env.USER_NAME}` },
    { key: "PASSWORD", value: `${process.env.PASSWORD}` },
  ],
});

new BrowserCheck(`create-and-delete-article`, {
  name: `create and delete article`,
  group,
  tags: ["check"],
  frequency: Frequency.EVERY_10M,
  code: {
    entrypoint: path.join(__dirname, "./crud-article.spec.ts"),
  },
  environmentVariables: [
    { key: "API_KEY", value: `${process.env.API_KEY}` },
    { key: "CHECKLY_ACCOUNT_ID", value: `${process.env.CHECKLY_ACCOUNT_ID}` },
  ],
});

new BrowserCheck(`set-storage-state`, {
  name: `sets storage state`,
  group,
  tags: ["storage"],
  frequency: 60,
  code: {
    entrypoint: path.join(__dirname, "./storageState.spec.ts"),
  },
  environmentVariables: [
    { key: "API_KEY", value: `${process.env.API_KEY}` },
    { key: "CHECKLY_ACCOUNT_ID", value: `${process.env.CHECKLY_ACCOUNT_ID}` },
    { key: "USERNAME", value: `${process.env.USER_NAME}` },
    { key: "PASSWORD", value: `${process.env.PASSWORD}` },
    { key: "PAGE_URL", value: `${process.env.PAGE_URL}` },
  ],
});
