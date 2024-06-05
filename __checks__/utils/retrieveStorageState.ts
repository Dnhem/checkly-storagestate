import { createChecklyContext } from "./createChecklyContext";

export async function retrieveStorageState() {
  const context = await createChecklyContext(
    process.env.API_KEY,
    process.env.CHECKLY_ACCOUNT_ID
  );

  let responseStorageState = await context.get(`variables/STORAGE_STATE`);
  let responseData = await responseStorageState.json();

  const parsedStorageState = JSON.parse(responseData.value);

  const jwtToken = parsedStorageState.origins[0].localStorage[0];
  console.log(jwtToken);

  return jwtToken;
}
