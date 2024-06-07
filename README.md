<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Checkly storageState Browser v1.0</h3>
  <p align="center">
    <a href="https://www.checklyhq.com/docs/"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>

<!-- Details -->

## Details
- A hacky work-around to mimic Playwright's storageState
- Not part of Checkly's official documentation/guides, use at your own risk
- Code is not meant to be cloned and only provide an example of the mechanism
- Log in and persist local storage via UI interaction. API version coming soon...
  
## Benefits
⚡️ Simplified Login - Persist authentication states (e.g., cookies & local storage) enabling tests to persist state increasing testing speed
<br />

🪨 Stability - Ensures a consistent starting point avoiding flaky tests that fail due to variations in state

## Files used in example

### 📁 utils
- `createChecklyContext.ts` - abstracts HTTP requests, something similar to `axios.create()`
- `retrieveStorageState.ts` - retrieves environment variable (containing storageState) from Checkly public API to parse and return token
(token validation can be added here)

### 📁 \_\_checks\_\_
- `browser.check.ts` - Checkly CLI constructs that groups and configure checks
- `login.spec.ts` - simple login script that test for successful login
- `storageState.spec.ts` - mechanism that captures storageState
- `crud-article.spec.ts` - test that only passes with valid JWT retrieved from storageState
  
## Mechanism
To securely store and update the storageState, create an environment variable with a ***placeholder value*** [directly on Checkly](https://app.checklyhq.com/environment-variables) or use the command `npx checkly env add <key> <value>`. This variable will hold the stringified storageState. The `storageState.spec.ts` file updates this environment variable by pinging the [Checkly Public API](https://developers.checklyhq.com/reference/getv1variables). Our main test file `crud-article.spec.ts` retrieves the storageState from Checkly and writes it to the browser’s local storage before running tests.

## Use cases
### Local testing
storageState often needs to be fresh (token expiration) `storageState.spec.ts` must run first, otherwise our test file(s) won't retrieve valid storageState and fail. In `browser.check.ts` each check has their respective `tags` which can be used to orchestrate the check execution.
1) First, run the test that captures and updates storageState `npx checkly test -t storage` will ONLY run `storageState.spec.ts`
2) Run the rest of the checks with `npx checkly test -t check` will run both `login.spec.ts` and `crud-article.spec.ts` 

### Monitoring
Have your test run on a schedule globally on Checkly with `npx checkly deploy`
- Schedule `storageState.spec.ts` to run with an appropriate time window maybe coinciding with your token expiration. The current frequency of this check is set to run every 60 mins. The rest of the checks can run every 10 minutes for example.
- If your test files are dependant on env variables, I find it best to avoid unexpected behavior by setting them on the dashboard on the [global level](https://app.checklyhq.com/environment-variables).

### CI Integration
Since your checks will be dependant on valid storageState first, the `storageState.spec.ts` must be ran first, similarily to the Local testing example. Add an extra job BEFORE running the rest of the checks to your workflow file:

```
- name: Run auth # Retrieve storageState before running rest of tests.
  id: run-auth
  run: npx checkly test -t storage -e USER_NAME=${{ env.USER_NAME }} PASSWORD=${{ env.PASSWORD }}
- name: Run checks # run the checks passing in the ENVIRONMENT_URL and recording a test session.
  id: run-checks
  run: npx checkly test -e ENVIRONMENT_URL=${{ env.ENVIRONMENT_URL }} --reporter=github --record
