import { createChecklyContext } from "./createChecklyContext";
import dotenv from "dotenv";
dotenv.config();

export async function retrieveStorageState() {
  const context = await createChecklyContext(
    process.env.API_KEY,
    process.env.CHECKLY_ACCOUNT_ID
  );

  let responseStorageState = await context.get(`variables/STORAGE_STATE`);
  let responseData = await responseStorageState.json();
  const parsedStorageState = responseData.value;

  console.log(">>>>>>>>>PARSED STORAGE STATE:", parsedStorageState);
  // Return the storage state
  return parsedStorageState;
}
