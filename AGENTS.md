# AGENTS.md — daphne-portfolio

Daphne Nong's personal portfolio (product designer). This project started as the
`14-archive-table` variant of a multi-design exploration and has been promoted to the
canonical working portfolio. It was formerly located at
`~/Downloads/portfolio-variations/14-archive-table`.

The pre-variation original lives at `~/Downloads/daphne-portfolio` — **read-only**,
do not edit it; it serves as a fork base and deploy source for
https://daphne-portfolio-440.netlify.app.

## Stack

- Vite + TypeScript, no framework. All pages are rendered client-side from template
  literals — there is no router library.
- Build: `npm run build` (runs `tsc && vite build`)
- Preview (how the user views it): `npx vite preview --port 4214 --strictPort`
  - Served at **http://localhost:4214**
  - Preview serves `dist/`, so **rebuild after every change** or the user won't see it.
- Dev alternative: `npm run dev` (serves `src/` live, no rebuild needed) — but the
  user's bookmarks and annotation flow assume port **4214**.

## Project layout

| Path | What it is |
|---|---|
| `src/main.ts` | **All markup lives here** as template literals (home, about, both case studies), plus the hash router and the cursor-following hover thumbnail JS. Edit copy and structure in this file. |
| `src/style.css` | All styling, single file, CSS custom-property tokens at `:root`. |
| `index.html` | App shell; loads `src/main.ts` `/src/style.css`, and the agentation `<script>` tag. |
| `public/assets/` | Images (`home`, `about`, `anaconda`, `new-relic`). Copied to `dist/` on build. |
| `public/agentation.js` | Pre-built annotation client bundle (see below). |
| `public/_redirects` | Netlify SPA redirects, if deployed. |

## Design tokens (src/style.css)

- `--accent: #1e40af` (dark blue — user explicitly moved off orange; do not revert)
- Paper/ink neutrals, `--mono` for labels/eyebrows, `--display` for headings
- `.hero-plate img` uses `height: auto` (no forced aspect crop) — keep it that way;
  the hero image is a wide ~2:1 Figma export
- `.works` (home "Index of works") intentionally has **no bottom border**

## Annotation feedback workflow (agentation)

The user gives feedback by annotating the live site in her browser. To process it:

1. The agentation backend must be running:
   `(nohup npx -y agentation-mcp@latest server --port 4747 > /tmp/agentation-4747.log 2>&1 &)`
2. Fetch pending annotations via the agentation MCP tools (`get_all_pending`),
   acknowledge, fix in `src/main.ts` / `src/style.css`, `npm run build`, verify with
   Playwright on http://localhost:4214, then `resolve` each annotation with a summary.
3. **Duplicates happen**: resolved annotations re-sync from browser localStorage with
   new IDs but identical text/timestamps. If an annotation asks for something already
   done (e.g. "accent is orange, make it blue"), verify the built CSS, resolve it as a
   duplicate, don't redo work.

## House rules for agents

- **Do not commit or push.** The user will ask explicitly ("stage git" = `git add`
  only, unless she says commit).
- Keep changes minimal and match the existing tone/spacing system — this design is
  intentionally restrained (thin rules, mono labels, lots of whitespace).
- After any visible change: rebuild, reload port 4214, and sanity-check the rendered
  page (Playwright screenshot) before reporting back.
- Background servers: start with `(nohup CMD >log 2>&1 &)` — a plain `&` subshell
  gets reaped between tool calls.
- Clean up temporary verification screenshots (`v*.png`) after viewing them.
