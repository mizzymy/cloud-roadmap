# CloudFlow

A cloud certification roadmap and study app. Run it locally or deploy as a PWA.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Add your API key to [.env.local](.env.local) (see the app’s config for the variable name).
3. Run the app:
   `npm run dev`

## Deploy and use on your phone (PWA)

The app is set up as a Progressive Web App (PWA). Deploy it, then add it to your phone’s home screen.

### Deploy (Vercel or Netlify)

1. **Build:** Run `npm run build` (output is in `dist/`).
2. **Deploy** the `dist/` folder to a host that serves over HTTPS:
   - **Vercel:** Connect your repo; set build command `npm run build`, output directory `dist`. In Project Settings → Environment Variables, add your API key.
   - **Netlify:** Build command `npm run build`, publish directory `dist`. In Site settings → Environment variables, add your API key.
3. Use the URL you get (e.g. `https://your-app.vercel.app`).

### Add to your phone

- **Android:** Open the deployed URL in Chrome → Menu (⋮) → “Add to Home screen” or “Install app.”
- **iOS:** Open the URL in Safari → Share → “Add to Home Screen” → name it and add.

Open the icon from your home screen to use the app fullscreen like a native app.
