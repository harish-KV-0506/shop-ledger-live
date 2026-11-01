# ShopLedger

ShopLedger is an English-first, English/Tamil shop ledger for tracking customer credit, payments, and cash sales. Each shop signs in with a private account; Supabase row-level security isolates its records, and Realtime synchronizes changes between signed-in devices.

## Features

- Private shop accounts, password reset, and shop-specific customer profiles
- Customer credit, payment, and cash-sale entries with notes and timestamps
- Balance summaries, search, customer filters, activity history, and CSV export
- Cross-device updates through Supabase Realtime
- English/Tamil language selection, dark/light themes, and responsive layouts
- Optional browser speech recognition for Tamil or English ledger entry
- Installable PWA app shell; it does not cache private ledger records for offline use

## Local setup

Requirements: Node.js 22+ and a Supabase project.

1. The live deployment uses the separate `harish-KV-0506's Project` Supabase project (`qyqgntxnldtgxpdsciyd`), not the ToDoo project. Its schema and RLS policies are already applied. For a different Supabase project, run [`supabase/migrations/20251101000000_shop_ledger.sql`](./supabase/migrations/20251101000000_shop_ledger.sql) in the SQL Editor.
2. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the project's URL and publishable/anon key. These browser values are public by design; never put a `service_role` key in this app.
3. Install and start the app:

   ```sh
   npm install
   npm run dev
   ```

4. In Supabase Authentication, configure the site URL and redirect URLs for local development and the deployed site. Signup and password reset redirect to the current app URL. Configure custom SMTP before inviting many users; Supabase's default email service is rate-limited.

The deployed GitHub Pages build has its Supabase client settings configured. Local development still requires `.env`. Without Supabase credentials, the app displays a setup notice and account/data operations do not work.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the Vite app and deploys `dist` to GitHub Pages on pushes to `main`.

1. Create a GitHub repository and push this project to its `main` branch.
2. In repository **Settings → Pages**, select **GitHub Actions** as the build and deployment source.
3. Add repository Actions secrets named `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Add the deployed `https://<owner>.github.io/<repository>/` address to the Supabase Authentication site's URL and redirect allow lists.
5. Run the deployment workflow and test signup, login, customer/entry writes, and realtime updates with two accounts/devices.

## Data, privacy, and limits

- Row-level security checks `auth.uid()` for every profile, customer, and ledger row. A composite foreign key also ensures an entry cannot point to another shop's customer.
- Supabase free-tier database, storage, email, and Realtime quotas/limits apply; consult the active project's dashboard before using it for business-critical records.
- Existing records in the old browser-only IndexedDB app are not automatically imported into Supabase, and this release has no legacy-data importer. Keep the old browser profile intact and make a separate backup before switching; the new app's CSV export is for downloading data, not importing it.
- The service worker caches only the same-origin app shell and static assets. Supabase authentication and ledger requests are never cached.
- Browser speech recognition support and accuracy vary; typed entry remains available.
- This app has not been configured against a live Supabase project until project credentials, migration, authentication URLs, and deployment secrets are supplied and tested.
