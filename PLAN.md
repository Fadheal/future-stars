# Candidate Qualification Web App Plan

## Goal

Build an Indonesian Next.js web app where a candidate enters their code and sees whether they qualified, along with their point breakdown and total score.

## Data Source

- Google Spreadsheet:
  `https://docs.google.com/spreadsheets/d/1_zKgFgEZRNAgXTg2eLRQ6XQ8skzNWi4pMeM6sj61ZQU/edit?usp=sharing`
- Use the public CSV export endpoint:
  `https://docs.google.com/spreadsheets/d/1_zKgFgEZRNAgXTg2eLRQ6XQ8skzNWi4pMeM6sj61ZQU/export?format=csv`
- Read the existing sorted order, from highest `total_point` to lowest.
- Expected columns:
  `code`, `name`, `tt_point`, `tsc_point`, `wwc_point`, `plus_point`, `minus_point`, `total_point`
- Fetch the spreadsheet server-side through a Next.js API route.
- Keep a short cache to avoid fetching the sheet for every lookup.
- Handle blank point values as `-` in the UI.

## Qualification Rule

- Candidates in rows 1 through 40 are qualified.
- Candidates after row 40 are not qualified.
- The row position is the candidate rank.
- Show rank only for candidates ranked 1 through 10.
- Use the spreadsheet's `total_point` and ordering as the source of truth.

## Application Stack

- Next.js
- TypeScript
- App Router
- CSS animations before adding an animation dependency
- Responsive layout for mobile and desktop

## User Flow

1. Show a red-branded landing page with the organisation logo.
2. User enters their candidate code.
3. Validate and normalize the code.
4. Search the spreadsheet data on the server.
5. Show a friendly error if the code does not exist.
6. Show the qualification result and candidate details if found.

## Result UI

Display:

- Candidate name
- Qualified or not qualified status
- Rank when the candidate is in the top 10
- `tt_point`
- `tsc_point`
- `wwc_point`
- `plus_point`
- `minus_point`
- `total_point`

## Visual Direction

- Primary brand color: red.
- Qualified result: celebratory stars/confetti, bouncing result card, and success icon.
- Not-qualified result: gentle fade or falling-paper animation with respectful wording.
- Respect `prefers-reduced-motion` and provide a non-animated fallback.

## Error Handling and Privacy

- Do not expose the full spreadsheet to the browser.
- Return only the matching candidate's data.
- Handle invalid input, missing candidates, blank cells, and spreadsheet fetch failures.
- Do not reveal other candidates' scores or names.

## Verification

- Test a qualified candidate.
- Test a non-qualified candidate.
- Test a top-10 candidate and rank display.
- Test a candidate ranked 11 or later and hidden rank.
- Test an unknown code.
- Test blank point fields.
- Test spreadsheet/API failure.
- Test mobile layout and reduced-motion behavior.

## Deployment

- Deploy to Vercel or another Next.js-compatible host.
- Configure the spreadsheet URL through an environment variable if needed.

## Open Asset Requirement

The expected `/agent_assets` folder is not currently available in the workspace. Add the organisation logo at:

`/home/fadheal/Documents/future_stars/agent_assets/`
