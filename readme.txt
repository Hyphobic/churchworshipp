WORSHIP CHORDS — maintained source
Repository: https://github.com/Hyphobic/churchworshipp

Static HTML/CSS/JavaScript PWA. No build dependencies or secret environment variables.
Preserve the original embedded book and dark burgundy/gold UI.

CLOUDFLARE PAGES SETUP
Connect this GitHub repository; production branch main; framework None;
build command exit 0; output directory . (repository root).
Use the free plan. A successful GitHub commit is NOT proof of deployment.
After deployment, compare verification.js against the deployed commit and
open both Victoria and Entonces La Iglesia lessons on mobile.

SPOTIFY
At developer.spotify.com/dashboard, open Chords for Church. Keep the old
Netlify redirect URI and add the exact new HTTPS root URL, including trailing
slash. The app derives its redirect from location.origin + location.pathname.
Launch from the root URL, enter the existing public Client ID, reconnect, and
check playlist sync. Never commit Client Secret, access tokens or refresh tokens.

FIRST MIGRATION FROM THE PAUSED NETLIFY SITE
Do not delete the old app or clear its website data.
In the SAME Safari tab / installed PWA used before, export reviews, charts,
and chains using their existing buttons. Those are separate backups. Import
in the corresponding sections of the new app. The old version has no favorite
export: record the Favorites list and re-star those recordings on the new site.
Different Safari/PWA storage may require separate backups. This repository
cannot read the user's phone storage or transfer it across origins automatically.
The new backup.html combines future backups, excluding OAuth tokens.
Do not assume a new backup.html is reachable on the old paused production site.

RECORDING IDENTITY
Source entries with Spotify IDs and both new study lessons match exact IDs,
independent of playlist order. Generic source candidates remain provisional.
Never automatically mark a recording verified. Source and study excerpts do
not establish that a particular recorded performance matches.
OWNER VERIFICATIONS live in the repo: add a "verification" object
({status, label, date}) to an exact-Spotify-ID entry in SOURCES and in
source-candidates.json, only after the owner says they checked that recording.
It shows on every device; a local review on a device overrides it.

CHECKS / RELEASE
Run node --check on changed JS; run node tests/migration.test.cjs.
Keep SOURCES and source-candidates.json synchronized when editing references.
Bump the service-worker cache on releases. refresh.html only confirms script
availability; verify the deployed commit separately. Test offline behavior,
Spotify callback, imports, and the two lesson dialogs after deployment.
