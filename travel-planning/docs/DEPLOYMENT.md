# Travel app deployment

## Verified baseline

PR #4 is merged into `main`. The Next.js production build and its TypeScript check pass locally. Supabase project `dahhfuwwlrmdhfirhwym` is healthy, and all seven application tables have Row Level Security enabled. This is build verification, not a completed login or trip-creation test.

## Vercel project configuration

Use the existing `app-development` project in `hendersonjames-projects`.

- Repository: `hendersonjames/App-Development-`
- Production branch: `main`
- Root directory: `travel-planning/app` (the repository root is not the Next.js app)
- Framework preset: Next.js
- Node.js: 24.x
- Install command: `npm ci` once this pull request is merged
- Build command: `npm run build`
- Output directory: framework default

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel for Production and Preview, using the connected travel Supabase project. Do not put key values into GitHub. Never substitute a service-role or secret key for the publishable key.

Check the settings in the dashboard before deployment; the connected project-details response does not expose all of these fields. The current connection has no callable deployment command, and there is no authenticated Vercel CLI in the workspace.

## Release validation

1. Deploy the selected Git commit and wait for READY. Inspect build logs if it fails.
2. Open the deployed home and login pages on mobile and desktop.
3. Confirm that `/trips` redirects an unauthenticated visitor to `/login`.
4. Set Supabase Auth's Site URL to the chosen production URL and verify the email-confirmation flow with a dedicated test account. Do not assume sign-up works solely because the build passes.
5. Sign in, create a test trip, reload, and verify persistence.
6. Verify a second test account cannot read the first account's trip.

The Vercel project currently reports deployment protection enabled for Vercel URLs. Verify the owner's access before sharing the app. Keep application authentication and Row Level Security enabled regardless of hosting protection.

The first slice supports account creation/sign-in and basic trip creation/listing. Itinerary editing, travelers, and the remaining MVP features will follow hands-on testing.
