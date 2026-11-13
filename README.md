# Plocky Game Hub

A static game portal that can be deployed directly to Vercel.

## Deploy from GitHub

1. Add the files in this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. If prompted, use the `game_portal_template` folder as the **Root Directory**.
4. Choose **Other** as the framework preset. No install or build command is needed; `vercel.json` publishes the files in this folder.
5. Deploy.

The included Vercel configuration also sets the response security headers used by the local server.

## Run locally

1. Install Node.js 18 or newer.
2. Run `node server.mjs` from this folder.
3. Open http://localhost:8080 in a modern browser.
4. Change `port` in `server-config.mjs` to use a different local port.

## Thumbnails and embedded games

The `assets` folder contains SVG placeholder thumbnails. Replace them with your own images if desired, and update the matching image paths in `index.html`.

The games are hosted on external sites. Those sites may block embedding; use **Open in new tab** if a game does not load in its frame. Their embedding and fullscreen behavior cannot be controlled by this site.
