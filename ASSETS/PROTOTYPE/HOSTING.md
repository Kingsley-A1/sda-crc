Hosting this prototype on GitHub Pages

Quick goal: Make this site available on GitHub Pages "right now".

Recommended (easiest) approach — use the repository "docs" folder:

1. In your repo root, create a folder named `docs/`.
2. Copy everything inside `ASSETS/PROTOTYPE/` into `docs/` (index.html, all HTML files, `styles.css`, `logo.png`, and any other assets).
   - If you use the command line from repo root:
     - macOS / Linux:
       cp -r ASSETS/PROTOTYPE/* docs/
     - Windows PowerShell:
       Copy-Item -Path .\ASSETS\PROTOTYPE\* -Destination .\docs -Recurse
3. Commit and push the changes to GitHub.

4. On GitHub: Settings → Pages → Source → select "main" (or your branch) and folder "/docs". Save.
5. Wait a minute, then visit: https://<your-username>.github.io/<your-repo>/

Notes & best-practices ✅
- Keep `index.html` in the root of `docs/` so the homepage loads automatically.
- Make sure `logo.png` and any local images are inside `docs/` and referenced via relative paths (e.g., `./logo.png` or `images/logo.png`).
- External images (Unsplash) will load fine, but for full offline reliability copy them into `docs/images/` and update `src` attributes accordingly.
- If you prefer serving from a branch, you can create a `gh-pages` branch and publish that instead.

Accessibility tip
- Add ARIA attributes and keyboard handlers for the mobile menu before public launch (I can add these for you if you'd like).

If you want, I can also:
- Copy all files into a `docs/` folder in this workspace (I cannot copy binary images for you — please ensure `logo.png` and any local images are copied into `docs/` afterwards), or
- Create a small deploy script you can run locally to prepare and push the `docs/` folder to GitHub.

Tell me how you'd like to proceed and I'll continue.