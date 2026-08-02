# Weekly Codex Automation Setup — Checkpoint

Checkpoint date: August 2, 2026

## Objective

Set up a review-first maintenance workflow in which Codex checks the FoodDrinkApp repository every Sunday at 9:00 AM Eastern, inspects browser compatibility and potential errors, and sends a report or prepares proposed changes for human review. Codex must not commit, push, or open a pull request without explicit approval.

## Project identity

- Codex project: `FDApp_Simp1_C1_2026`
- Local repository: `/Users/sk/Desktop/Codex Projects/FoodDrinkApp/FDApp_Simp1_C1_2026`
- GitHub repository: `SK-WebApp/FDApp_Simp1_C1_2026`
- Default branch: `main`
- GitHub Pages URL: <https://sk-webapp.github.io/FDApp_Simp1_C1_2026/>
- Repository visibility: private; the Pages site is reachable publicly

## Work completed and verified

1. Initialized the local application folder as a Git repository.
2. Created a `.gitignore` for operating-system files, secrets, dependencies, generated build output, editor files, and Playwright output.
3. Connected the local repository to the private GitHub repository.
4. Committed and pushed the application to `origin/main`.
5. Registered the actual Git repository folder as its own Codex project.
6. Configured GitHub Pages to deploy from `main` and `/(root)`.
7. Verified the Pages URL in a private/incognito browser window on desktop and mobile.
8. Removed an obsolete commented-out Food/Drink image-control block from `index.html`.
9. Installed Node.js 24 and Playwright tooling.
10. Added Playwright configuration for five browser/device projects:
    - Chromium / Desktop Chrome
    - Firefox / Desktop Firefox
    - WebKit / Desktop Safari
    - Mobile Chrome / Pixel 5
    - Mobile Safari / iPhone 12
11. Added three Playwright smoke tests:
    - Main page and essential controls load
    - Drink selection enters the drink pathway
    - Food selection enters the food pathway
12. Corrected test navigation from `page.goto('/')` to `page.goto('index.html')` so tests work with the GitHub Pages repository subpath.
13. Verified all 15 test executions pass against the published Pages site.
14. Added the GitHub Actions workflow `Browser Compatibility Tests`.
15. Configured GitHub Actions to run on pushes to `main`, pull requests targeting `main`, and manual dispatch.
16. Configured Playwright reports to be uploaded for 30 days with `actions/upload-artifact@v7`.
17. Verified both GitHub workflows finish successfully with green checks:
    - `pages build and deployment`
    - `Browser Compatibility Tests`

## Important files

- `.github/workflows/playwright.yml` — GitHub Actions browser-test workflow
- `playwright.config.js` — local server, reports, retry policy, and browser/device matrix
- `tests/smoke.spec.js` — initial automated smoke tests
- `package.json` and `package-lock.json` — reproducible test dependencies
- `.gitignore` — excludes `node_modules`, Playwright reports, test results, and other generated files

## Useful commands

Run all tests against the local repository through the configured local server:

```bash
npx playwright test
```

Run Chromium tests against the published Pages site:

```bash
BASE_URL="https://sk-webapp.github.io/FDApp_Simp1_C1_2026/" npx playwright test --project=chromium
```

Run all 15 tests against the published Pages site:

```bash
BASE_URL="https://sk-webapp.github.io/FDApp_Simp1_C1_2026/" npx playwright test
```

Open the most recent Playwright HTML report:

```bash
npx playwright show-report
```

## Current Git state at checkpoint

The application and testing setup are synchronized between local `main` and `origin/main`. The latest verified setup commit at the time of this checkpoint was:

```text
975205c Update artifact upload action to Node 24
```

This checkpoint document itself was created locally after that commit and should be reviewed before committing it.

## Work not yet completed

The Sunday Codex automation has not yet been configured for the final Git-backed project.

Desired automation behavior:

- Run every Sunday at 9:00 AM in `America/New_York`, including daylight-saving changes.
- Operate on the Codex project `FDApp_Simp1_C1_2026`.
- Start from the latest safe Git state and inspect synchronization status.
- Review the latest GitHub Actions and Pages deployment results.
- Run the existing Playwright test suite locally and, when appropriate, against the live Pages URL.
- Check HTML, CSS, JavaScript, JSON, the web manifest, and assets for errors, broken references, deprecated web APIs, browser-compatibility changes, accessibility-related browser issues, and security concerns.
- Report checks performed, results, prioritized findings, file/line references, limitations, and recommended changes.
- Notify the user even when no action is required.
- Use an isolated Git worktree for any proposed fixes.
- Do not modify `main`, install or upgrade dependencies, commit, push, create a branch, or open a pull request without explicit approval.

## Recommended next action

Configure and activate the Sunday 9:00 AM Eastern Codex automation for the `FDApp_Simp1_C1_2026` Codex project. After creation, inspect its saved settings and, if supported, perform a controlled manual test run before relying on the weekly schedule.

## Copy/paste prompt for a new Codex task

```text
Continue the FoodDrinkApp weekly maintenance automation project. Read CODEX_AUTOMATION_CHECKPOINT.md in the repository root first. The GitHub repository, GitHub Pages deployment, Playwright smoke tests, and GitHub Actions browser-test workflow are already configured and passing. The next task is to configure and verify the review-first Codex automation for every Sunday at 9:00 AM America/New_York. It must notify me with a report, use an isolated worktree for proposed fixes, and never commit, push, or open a pull request without my explicit approval.
```
