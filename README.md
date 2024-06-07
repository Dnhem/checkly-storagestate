<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Checkly storageState Browser v 1.0</h3>
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
⚡️ Simplified Login - persist authentication states (e.g., cookies & local storage), enabling tests to persist state increasing testing speed
<br />
🪨 Stability - Ensures a consistent starting point avoiding flaky tests that fail due to variations in state

## 🏃🏻 Rundown of folder and file structure:

### 📁 utils

Directory housing Checkly's core directory "\_\_checks\_\_" also contains the "alert-channels.ts" file which holds all the alert constructs.

### 📁 \_\_checks\_\_

The core directory where Checkly detects your test files to run and deploy.

## Implementation

## ♾️ Deploying via CI/CD Pipeline


