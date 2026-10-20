# Cambodia itinerary

A mobile-friendly itinerary for 19–25 October 2026, built from the traveller's spreadsheet and supplied MotoTom article text. Plain HTML, CSS and JavaScript; no build step or package dependencies.

## Develop

Use this existing checkout (cloud tasks are already isolated; no extra worktree is needed).

```sh
cd /workspace/cambodia-trip
python3 -m http.server 8000
```

- `trip.js`: dates, stays, day schedules, estimates, map points, budget logic, checklist and sharing.
- `index.html`: page structure, source notes and illustrated route map.
- `styles.css`: responsive screen and print layouts.
- `itinerary.md`: lightweight fallback; keep it in sync with the day data.
- `sw.js`: same-origin offline cache. Bump its cache version after releases that change the guide's files. External map links need connectivity.

Booking status and arrival status are not inferred from the calendar. The family section shows plans, not tracking. Cost estimates are explicit assumptions; bike hire can be edited or excluded and prepaid accommodation can be excluded. Checklist state is stored locally on the current browser only. No credentials, booking references or source spreadsheet are published.

## Validate

Run `node --check trip.js`, `node --check sw.js`, and `git diff --check`. Serve locally, then check all seven date buttons, budget controls, checklist persistence/reset, sharing fallback, mobile layout, print output and offline reload. Functional checks use Python Playwright with system Chromium in the cloud; neither is required to serve the site.

## Publish

GitHub Pages: **Settings → Pages → Deploy from a branch → main → / (root)**. Push to `main`; Pages publishes automatically if enabled. Expected URL: https://williamlow.github.io/cambodia-trip/ . Push success alone does not establish that Pages has deployed.

## Sources and caveats

Dates, named stays, flight numbers, boat operator and bus times come from `Cambodia trip.xlsx`. The sheet has no year; 2026 is an explicit assumption from the current trip context. Route distances and attractions come from the MotoTom article pasted by the traveller; durations and USD allowances are planning estimates. The source has inconsistent four/five-day language and waypoint ordering; the operator's actual GPS track remains necessary for navigation. The SVG is a schematic connection of approximate town coordinates, not a road trace. Map links show road overviews or property-name searches, not verified tracks or hotel pins.
