# getProjects

Reconstruct the public portfolio endpoint without changing its consumer or stored
documents. Scope: one v1 HTTP function, `us-central1`, 256 MB, Node.js 20, and the
root Firebase functions configuration. No deployment, migration, authentication
change, or portfolio changes are included. Change classification: M (localized
API reconstruction with defensive data handling).

Implementation sequence: contract tests, handler and Firebase registration,
syntax/load checks, dependency installation, then best-effort emulator validation.

## Response and input contract

Successful GET requests return `{ success: true, count, limit, includeReadme,
projects }`. `count` is the returned array length. `limit` defaults to 100 and is
clamped to 100; only positive decimal integer strings are accepted. Invalid
parameters use defaults. `includeReadme` defaults to true; only the exact string
`false` disables it. `locale` is accepted and logged, but data is not localized.

Every project has the Firestore document ID and a nonblank string title. Optional
fields are explicitly allowlisted: description, image, previewLink, githubLink,
technologies, status, isDeployed, readmeUrl, readmeFileName, hasReadme, createdAt,
updatedAt. Wrong optional types are omitted and logged; technologies are normalized
to trimmed, nonempty strings, including comma-separated legacy values. Invalid
technology types become an empty array. Unknown document fields are not exposed.

Timestamps are explicitly serialized as `{ _seconds, _nanoseconds }`. SDK timestamps
and plain objects with either spelling are accepted when both values are valid.
Dates and integer Unix milliseconds are converted; absent, malformed, nonfinite,
or out-of-range values are omitted. Numeric seconds are not guessed. Read the whole
collection without `orderBy`; sort descending in memory, comparing nanoseconds on
ties and placing missing dates last. Equal timestamps retain snapshot order.

`includeReadme=false` removes both README strings but preserves `hasReadme`, derived
from a nonempty URL, filename, or stored boolean true. All document reads are read-only.
Missing, empty, or non-string titles are skipped with an ID-bearing warning.

## Decisions

- Keep `image: ""`: the consumer already treats it as no media. Invalid nonempty
  image URLs are omitted with a warning; only HTTPS images are accepted. No placeholder.
- Preserve duplicate titles by default: equal titles can represent distinct projects.
  Log each duplicated title with all its document IDs. Optional `dedupe=true` keeps
  the newest project per exact, case-sensitive title, before applying the limit.
- Use manual CORS headers: six exact origins and two methods need no extra package.
  Unknown origins still receive GET data without `Access-Control-Allow-Origin`.
  Set `Vary: Origin`; no credentials. OPTIONS returns 204 without Firestore reads;
  other non-GET methods return 405 with `Allow: GET, OPTIONS`.
- Log parsed parameters, collection document count, skips, coercions, duplicates,
  and error message plus stack. Failures return 500 with only
  `{ success: false, error: "Unable to load projects." }`.

Allowed origins and repository evidence:

| Origins | Evidence |
| --- | --- |
| `https://portfolio-correa-jonathan.web.app`, `https://portfolio-correa-jonathan.firebaseapp.com` | `D:/Repositorio/portfolio/.firebaserc:3`; production workflow `.github/workflows/firebase-deploy.yml:50-51` selects the live channel and this project. Default Hosting domains inferred from that project ID; no custom site/domain in inspected hosting config or workflow. |
| `https://tecnofuision-it.web.app`, `https://tecnofuision-it.firebaseapp.com` | `D:/Repositorio/tecnofusion/.firebaserc:3`; root Hosting config has no site override. |
| `http://localhost:5173`, `http://127.0.0.1:5173` | Required development origins; portfolio `vite.config.ts:5-8` has no custom server port. |

Only direct dependencies: `firebase-admin` and `firebase-functions`. Tests use the
built-in Node test runner. No lint or predeploy hook is configured.

## Verification and remaining work

Executed under Node v22.23.2, npm 10.9.8; target runtime remains Node 20 as requested.

- Initial test setup inherited the root ESM mode; setting this package explicitly
  to CommonJS resolved that setup error. Valid RED: `node --test
  test/get-projects.test.js` failed because `../get-projects` did not exist.
- GREEN: seven contract tests passed with zero failures. External Firestore and
  logger boundaries use deterministic fakes, no credentials or network. No separate
  refactor needed for this small implementation. Actual SDK compatibility still needs
  the load/emulator checks below to pass.
- `node --check index.js`, `node --check get-projects.js`, and
  `node --check test/get-projects.test.js` all exited 0.
- `npm install` could not fetch dependencies: network requests to registry.npmjs.org
  failed with EACCES. npm cache was redirected to `.npm-cache` inside this folder.
- `node -e "require('./index.js')"` exited 1: `Cannot find module 'firebase-admin'`.
- `npx firebase-tools emulators:start --only functions,firestore --project
  tecnofuision-it` exited 1: registry fetch for firebase-tools failed with EACCES.
  The stated global CLI was not available through PATH in this sandbox.

No emulator started, documents were not seeded, no HTTP response was observed,
and no real Firestore data was accessed. Production permissions, actual dirty data,
deployed logs, custom Hosting domains, and target Node 20 execution remain unverified.
Dependency installation and a resolved package lock remain outstanding.

Retry installation, load check, and emulator validation in an environment with
registry access before deployment. Unit tests alone do not verify the deployed SDK
or network endpoint. Production remains unchanged, including its reported HTTP 500.
Each GET still reads the entire collection, even with a small limit, as required.

From `D:/Repositorio/tecnofusion`, the operator may deploy only this function after
verification (not executed by this worker):

```powershell
firebase deploy --only functions:getProjects --project tecnofuision-it
```

The endpoint name, generation, region, and response contract remain compatible with
the hardcoded consumer URL. Rollback before deployment is limited to removing this
new folder and the functions configuration block; no Firestore data changes exist.
Because the previous source is lost, this work does not establish a deployable backup
of the old function.

Reference: [Firebase first-generation function management](https://firebase.google.com/docs/functions/1st-gen/manage-functions-1st)
and [Firebase first-generation logging](https://firebase.google.com/docs/functions/1st-gen/writing-and-viewing-logs-1st).
