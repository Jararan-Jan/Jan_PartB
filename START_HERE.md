# Assignment 3 Part B — Jan

JavaScript + TestCafe code for T004/F4 Login, T005/F5 Registration and T006/F6 Password Recovery on OpenCart Abstracta. There are nine scenario tests. These are executable test plans, NOT evidence of passing tests. No live authenticated test run has been completed by the author. Website messages/assertions may need adjustment after you inspect the actual results.

## 1. Prepare your Mac

1. Install Node.js LTS from https://nodejs.org/ and Google Chrome from https://www.google.com/chrome/ if missing. Install Visual Studio Code from https://code.visualstudio.com/.
2. Extract the ZIP. In VS Code choose File > Open Folder > Jan_PartB.
3. In VS Code choose Terminal > New Terminal. Check that Terminal is inside Jan_PartB (the folder containing package.json).
4. Run these commands separately:

```bash
node --version
npm --version
npm install
npx testcafe --version
```

Do not copy your friend's version numbers. If npm install reports a permissions error, do not use sudo; share the error for diagnosis.

## 2. Set your demo account

Open config.cjs. Replace CHANGE_ME@example.com with a NEW email address that YOU control and that has not been registered on this demo site. Save with Command+S. The supplied password is for a disposable demo account only. Do not enter your normal email password. Recovery sends a real request to this address. Screenshots may display it; use a dedicated test address.

The default browser is Chrome. If you use Chrome, write Chrome in your report, even if you usually browse with Safari.

## 3. Run in this order and capture Terminal evidence

Run ONE command at a time. Allow Chrome to open and finish. Do not interact with the automated browser.

```bash
npm run registration
```

After it finishes, screenshot Terminal with the three T005 scenario names, pass/fail indicators and summary visible. Save it as T005-terminal.png. If T005-S1 failed, diagnose before running Login/Recovery. Do not rerun registration using the same email after S1 created the account: a new-account test will then correctly fail. Use another new controlled address in config.cjs when rerunning the entire registration suite.

```bash
npm run login
```

Capture the summary as T004-terminal.png.

```bash
npm run recovery
```

Capture the summary as T006-terminal.png.

Alternatively npm test runs all three files sequentially; it stops before downstream files if registration has failures. For a clean full run use a NEW email. Do not enable concurrency, quarantine or retries: registration changes server state.

## 4. Website screenshots — already automated

Open the evidence folder in VS Code or Finder. Each named PNG shows the website after submitting the scenario. A named screenshot is captured before assertions, so its existence does NOT mean the scenario passed. Read Terminal and reports/*.json to determine the outcome. TestCafe may also save extra failure screenshots.

| Report table | Scenario | Website screenshot | What to inspect |
| --- | --- | --- | --- |
| T004 / F4 | S1 valid login | evidence/T004-S1.png | My Account heading and Logout link |
| T004 / F4 | S2 wrong password | evidence/T004-S2.png | Rejection warning and login page |
| T004 / F4 | S3 empty fields | evidence/T004-S3.png | Rejection warning and login page |
| T005 / F5 | S1 new account | evidence/T005-S1.png | Account creation confirmation |
| T005 / F5 | S2 duplicate email | evidence/T005-S2.png | Email already registered warning |
| T005 / F5 | S3 mismatch | evidence/T005-S3.png | Password confirmation validation |
| T006 / F6 | S1 registered email | evidence/T006-S1.png | Recovery acknowledgement on login page |
| T006 / F6 | S2 unregistered email | evidence/T006-S2.png | Email not found warning |
| T006 / F6 | S3 empty email | evidence/T006-S3.png | Rejection and no success acknowledgement |

If a page-load/selector error prevents the named screenshot, use TestCafe's failure screenshot and record the error honestly. If recovery returns a server/mail error, preserve it; do not mark PASS or change the test to accept an error. UI acknowledgement does not prove email delivery or successful password reset.

## 5. Code screenshots — like Part A

1. Open tests/login.js in VS Code. Hide the sidebar with Command+B and close the Terminal panel if needed. Keep the filename and line numbers visible.
2. Adjust editor zoom so code is readable. Press Shift+Command+4 and drag around the editor. Capture the imports, fixture and each complete scenario including assertions. Use multiple images if needed; do not shrink text until unreadable.
3. Save as T004-code-1.png, T004-code-2.png etc.
4. Repeat for tests/registration.js (T005-code-...) and tests/recovery.js (T006-code-...).
5. Also capture tests/helpers.js, because registration steps, screenshots and negative-login assertions are implemented there. Include config.cjs only with a dedicated test address and demo-only password. Never publish personal credentials.

These are source-code screenshots, not fabricated website results. Do not screenshot code alone as evidence that the website passed.

## 6. Put evidence in the group report

For each T004/T005/T006 table:
- Function IDs/Names: the corresponding F4/F5/F6.
- Tester: Rachaneekorn Kaewpiboon.
- Keep the three scenario plans already drafted. For registration use the exact config values you actually ran, including your real dedicated test email.
- Test Results: write each scenario's actual outcome; insert its website PNG immediately after the result sentence.
- Add the function's Terminal screenshot and code screenshots below the three results. Include the shared helper screenshots once and reference them from other tables.
- Under code images write the source filename. If using GitHub, link the actual published file. Do not invent a repository link.

Suggested result format (fill from the run, do not copy PASS blindly):

T004-S1 — [PASS/FAIL/ERROR]. Actual result: [observed page/message]. Evidence: T004-S1.png.

A negative-input scenario PASSES when the website rejects the input as expected. An assertion mismatch is a FAIL; a blocked run, page-load failure or selector/tool problem needs investigation and can be recorded as ERROR in the report. TestCafe's general failed count includes different error types, so inspect details before splitting Fail/Error statistics.

## 7. Environment and setup section

Record Apple M1 (ARM64) only if confirmed in About This Mac. Check the actual macOS version there too. Record JavaScript / Node.js version from node --version; TestCafe from npx testcafe --version; Chrome from Chrome > About Google Chrome; VS Code from Code > About Visual Studio Code. Version control: Not used if submitting ZIP without Git, or actual Git version/repository if used.

Setup paragraph to adapt AFTER completing setup:

Node.js and Google Chrome were installed on the test machine. A local project folder was opened in Visual Studio Code, and TestCafe was installed using npm install. A dedicated demo account email was configured in config.cjs. Registration tests were executed first, followed by login and password recovery tests in Chrome. TestCafe saved scenario screenshots and JSON result reports for inclusion in the system test report.

## 8. Analysis, AI evidence and submission

Use reports/registration.json, reports/login.json and reports/recovery.json and Terminal to count actual outcomes. Do not claim 9/9 unless all nine passed. Summarise findings and lessons in 3–5 sentences for Part B and provide the group with your counts.

Keep an honest record of the prompt used to generate this code (e.g. your actual request “Make all code and guide me to screenshot for each part like part a”), what AI supplied, what you checked and any subsequent corrections. Do not claim checks you did not perform.

Submit the source ZIP (or real public GitHub repository) individually. Include package.json, package-lock.json generated by npm install, config.cjs containing demo-only values, run.cjs, .testcaferc.json, tests/, evidence/, reports/ and your code/Terminal screenshots. Exclude node_modules. On Mac: copy those files into a submission folder, right-click > Compress. Give the group the screenshots/results for the combined report.

## Troubleshooting

- 'node: command not found': install Node.js and restart VS Code.
- Chrome not found: install Chrome, then rerun the same command.
- Email already registered during S1: use a new controlled address and rerun registration.
- Login fails after successful registration: check config did not change and inspect the actual warning. Avoid repeated wrong-password attempts that may lock the account.
- Recovery S1 fails with mail/server error: preserve screenshot and report the observed failure; UI and email delivery are separate checks.
- Warning text differs: inspect the screenshot/page before editing an assertion. Keep the expected functional behaviour intact; do not weaken it just to obtain PASS.
- JSON reports and named screenshots are overwritten on another run; copy the run you want to keep before rerunning.

Reference: https://testcafe.io/documentation/402635/guides/overview/getting-started
