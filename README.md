# SACA 2025 — Competition Landing Page


This repository contains a minimal, mobile-first static landing page with an entry form ready to deploy to Cloudflare Pages. It's designed for rapid iteration via GitHub and integrates with a Cloudflare Worker backend.


## Contents
- `index.html` — main page markup
- `styles.css` — page styles
- `script.js` — form behaviour and submit logic


## Quick start
1. Replace `WORKER_URL` in `script.js` with your Worker endpoint (e.g. `https://competition-api.yourcompany.workers.dev`).
2. Commit & push to GitHub (e.g. `main` branch).
3. In Cloudflare dashboard → Pages → Create a project → Connect to this repo → Deploy (output directory `/`).
4. (Optional) Add a custom domain in Pages settings.


## Notes
- This is a placeholder layout — final visual design will be provided by design team (Jodi / Kelly).
- Keep `script.js` editable so Worker URL and other config can be updated without changing HTML.