# SYNESTHESIA: The AR Sound-Scaper

This repo now ships a **one-click GitHub Pages deploy** for the SYNESTHESIA demo. The site is served directly from
`docs/` (no build step required). The UI source lives in `docs/app.js`, and the HTML shell lives in `docs/index.html`.

## ✅ Fastest Deployment (one click)

1. **Push to the `work` branch** (the GitHub Action is already configured).
2. In GitHub, go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. You’re done. The workflow will publish automatically on every push to `work`.

> Tip: You can also manually run the workflow from **Actions → Deploy to GitHub Pages → Run workflow**.

## Local Preview (optional)

Serve the `docs/` folder locally:

```bash
python -m http.server 4173 --directory docs
```

Then open: `http://localhost:4173`

## Where is the old file?

If you are seeing a giant block of music-education text, you are opening the **old `React` file** directly. That file
is no longer the deploy target. The live site uses:

- `docs/index.html`
- `docs/app.js`

If you want to change the UI, edit `docs/app.js` and push to the `work` branch.
