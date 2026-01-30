<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1_LR8f-OIACZ7zETAGgEmxAsH8xv5QHwG

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy and use on your phone (PWA)

The app is set up as a Progressive Web App (PWA). Deploy it, then add it to your phone’s home screen.

### Deploy (Vercel or Netlify)

1. **Build:** Run `npm run build` (output is in `dist/`).
2. **Deploy** the `dist/` folder to a host that serves over HTTPS:
   - **Vercel:** Connect your repo; set build command `npm run build`, output directory `dist`. In Project Settings → Environment Variables, add `GEMINI_API_KEY`.
   - **Netlify:** Build command `npm run build`, publish directory `dist`. In Site settings → Environment variables, add `GEMINI_API_KEY`.
3. Use the URL you get (e.g. `https://your-app.vercel.app`).

### Add to your phone

- **Android:** Open the deployed URL in Chrome → Menu (⋮) → “Add to Home screen” or “Install app.”
- **iOS:** Open the URL in Safari → Share → “Add to Home Screen” → name it and add.

Open the icon from your home screen to use the app fullscreen like a native app.
