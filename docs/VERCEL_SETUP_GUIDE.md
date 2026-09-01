# Vercel Deployment via GitHub Actions

This guide explains how to bypass Vercel's Hobby plan single-collaborator limitation by routing all team deployments through GitHub Actions using a single authenticated token.

## 1. Generate a Vercel Personal Access Token
1. Go to your [Vercel Tokens Settings](https://vercel.com/account/tokens).
2. Click **Create**, give it a name (e.g., `GitHub Actions`), and set an expiration (or No Expiration).
3. Copy the token immediately (you won't be able to see it again). This is your `VERCEL_TOKEN`.

## 2. Retrieve Project & Org IDs
You need to link your local project to Vercel to extract its unique configuration IDs.
1. In your local project terminal, run:
   ```bash
   npx vercel link
   ```
2. Follow the prompts to log in and link to the existing Vercel project.
3. Open the newly created `.vercel/project.json` (or `.vercel/repo.json`) file.
4. Copy the `orgId` and `projectId` (or `id` if in repo.json).

## 3. Configure GitHub Secrets
Go to your project's repository on **GitHub** → **Settings** → **Secrets and variables** → **Actions** and add these three **Repository Secrets**:
* `VERCEL_TOKEN`: *(The token you generated in Step 1)*
* `VERCEL_ORG_ID`: *(The `orgId` from Step 2)*
* `VERCEL_PROJECT_ID`: *(The `projectId` or `id` from Step 2)*


> **Crucial Step for Sensitive Environment Variables:** 
> Vercel CLI sometimes struggles to inject "Sensitive" variables (like `PAYLOAD_SECRET` and `DATABASE_URL`) directly into the Next.js static generation process during GitHub Actions, causing the build to fail with `Error: missing secret key`.
> 
> You MUST copy every "Sensitive" variable from your Vercel Dashboard and add them here as GitHub Repository Secrets so they can be explicitly injected into the build step.

## 4. Add the GitHub Actions Workflow
Create a file at `.github/workflows/deploy.yml` and paste the following configuration. 

> **Important:** 
> - Update the `git config user.email` and `user.name` placeholders with the exact credentials associated with your Vercel account.
> - If your new project uses `npm` or `yarn` instead of `pnpm`, simply delete the `npm install --global pnpm` lines from the workflow.

```yaml
name: Vercel Deployments
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}

jobs:
  deploy-production:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set Vercel-compatible git author
        run: |
          git config user.email "YOUR_EMAIL@example.com"
          git config user.name "YOUR_USERNAME"

      - name: Install Dependencies (pnpm & Vercel CLI)
        run: |
          npm install --global pnpm
          npm install --global vercel@latest

      - name: Pull Vercel env
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build
        env:
          # Inject any variables marked as Sensitive in Vercel here
          PAYLOAD_SECRET: ${{ secrets.PAYLOAD_SECRET }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy
        run: vercel deploy --prebuilt --prod --archive=tgz --token=${{ secrets.VERCEL_TOKEN }}

  deploy-preview:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set Vercel-compatible git author
        run: |
          git config user.email "YOUR_EMAIL@example.com"
          git config user.name "YOUR_USERNAME"

      - name: Install Dependencies (pnpm & Vercel CLI)
        run: |
          npm install --global pnpm
          npm install --global vercel@latest

      - name: Pull Vercel env
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build
        env:
          # Inject any variables marked as Sensitive in Vercel here
          PAYLOAD_SECRET: ${{ secrets.PAYLOAD_SECRET }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy
        run: vercel deploy --prebuilt --archive=tgz --token=${{ secrets.VERCEL_TOKEN }}
```

## 5. Deployment Optimizations & Limits

When Next.js builds, it produces thousands of discrete files (traced dependencies, static chunks, etc.). By default, the `vercel deploy` CLI uploads these individually, which can quickly exhaust Vercel's **5,000 files/day** upload limit on the Hobby plan (this is purely a CLI upload rate limit, not related to site traffic).

To solve this, the workflow above uses the `--archive=tgz` flag. This zips your build output locally into a single file before uploading, completely bypassing the 5,000-file cap.

**Important Limits & Tips (Vercel Hobby Plan):**
- **100GB bandwidth/month:** Actual site traffic allowance.
- **1 concurrent build:** If teammates push close together, deployments queue and run sequentially, not in parallel.
- **100MB max CLI upload size:** Because `--archive=tgz` bundles everything into a single file, ensure your compressed build output remains under 100MB (Pro plan is 1GB).
- **4 hours Active CPU/month:** Limits for serverless function execution.
- **Non-commercial use only:** If the project becomes commercial (generates revenue or serves paying customers), you must upgrade to the Pro plan or migrate to a VPS (e.g., Coolify).
- **.vercelignore:** For further optimization, create a `.vercelignore` file in the root of your repo to exclude files Vercel doesn't need to serve (e.g., `.git`, `.github`, `tests/`, `*.md`). This shrinks the archive size and slightly speeds up the tar/untar process.

## 6. Disconnect Vercel's Native GitHub Integration
To prevent Vercel and GitHub Actions from both trying to deploy simultaneously (which causes double-deployments and permission errors for teammates):
1. Go to your **Vercel Dashboard** → Your Project → **Settings** → **Git**.
2. Find the "Connected Git Repository" section and click **Disconnect**.

## 7. Commit and Push
Once the secrets are added and the workflow file is saved, simply commit and push your changes to `main`. GitHub Actions will automatically kick in and handle all Production and Preview deployments securely on behalf of your team.
