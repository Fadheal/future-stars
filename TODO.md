# TODO

## Project Setup

- [x] Initialize a Next.js project with TypeScript and App Router.
- [x] Add the Indonesian page structure and responsive layout.
- [x] Add the red brand theme.
- [x] Add the organisation logo when the asset is available.

## Spreadsheet Integration

- [x] Add the Google Sheets CSV export URL to environment configuration.
- [x] Create a server-side candidate lookup API route.
- [x] Fetch and parse the CSV data.
- [x] Validate the expected spreadsheet columns.
- [x] Normalize candidate codes before searching.
- [x] Add a short server-side cache.
- [x] Handle spreadsheet fetch and parsing failures.

## Qualification Logic

- [x] Use the spreadsheet row order as the ranking order.
- [x] Mark ranks 1 through 40 as qualified.
- [x] Mark ranks after 40 as not qualified.
- [x] Show rank only for ranks 1 through 10.
- [x] Use `total_point` and the spreadsheet ordering as the source of truth.

## Candidate Experience

- [x] Build the candidate code input form.
- [x] Add input validation and loading state.
- [x] Show a friendly message for unknown codes.
- [x] Return only the matching candidate's data.
- [x] Display the candidate name and qualification status.
- [x] Display `tt_point`, `tsc_point`, `wwc_point`, `plus_point`, `minus_point`, and `total_point`.
- [x] Display `-` for blank point values.
- [x] Display rank for top-10 candidates only.

## Animation and Accessibility

- [x] Add a CSS celebration animation for qualified candidates.
- [x] Add a gentle, respectful animation for non-qualified candidates.
- [x] Add a reduced-motion fallback using `prefers-reduced-motion`.
- [x] Check color contrast and keyboard accessibility.

## Verification

- [x] Test a qualified candidate.
- [x] Test a non-qualified candidate.
- [x] Test a top-10 candidate and rank display.
- [x] Test a candidate ranked 11 or later with hidden rank.
- [x] Test an unknown code.
- [x] Test blank point fields.
- [x] Test spreadsheet/API failure handling in code.
- [x] Test mobile layout in CSS.
- [x] Test reduced-motion behavior in CSS.
- [x] Confirm the browser never receives the full spreadsheet.

## Deployment

- [ ] Deploy to Vercel or another Next.js-compatible host.
- [ ] Configure the spreadsheet URL in production.
- [ ] Verify the production lookup flow.
