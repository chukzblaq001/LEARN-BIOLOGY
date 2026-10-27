# BIOLEARN — Free Offline Biology Learning App

A beginner-friendly Biology learning PWA made with plain HTML, CSS and JavaScript. No paid services or JavaScript frameworks are required.

## What is included in this starter

- Responsive layout for Android phones and Windows computers
- Sample lessons spanning JSS 1 through University 400
- Search and level filters
- Lesson notes and simple built-in educational diagrams
- Multiple-choice quizzes with instant marking and explanations
- Local progress, quiz score and bookmark saving with `localStorage`
- Offline Biology tutor that searches bundled lesson content (no internet or API key needed)
- PWA manifest and service worker for offline caching
- Install button where supported by the browser

## Run it on your Windows computer

**Recommended:** Use VS Code with the free Live Server extension.

1. Extract `BIOLEARN.zip` to a folder you can find, such as `Documents/BIOLEARN`.
2. Open VS Code.
3. Select **File → Open Folder** and choose the extracted `BIOLEARN` folder.
4. In the Extensions panel, search for **Live Server** and install it.
5. Open `index.html`, right-click inside it, and choose **Open with Live Server**.
6. A browser tab should open. Try a lesson, bookmark a topic and take a quiz.

Do not open `index.html` by double-clicking it if you want to test offline/PWA installation: service workers require `localhost` or HTTPS.

## Test offline on your computer

1. Open the app through Live Server.
2. Let the page load completely once.
3. In Chrome, open Developer Tools → Application → Service Workers and check that the service worker is active.
4. In Developer Tools → Network, select **Offline**, then refresh. The app should load from its cache.

Browser menus can vary. Test offline after each major update.

## Use it on Android

### Local testing
Your computer's `localhost` address is not automatically accessible from your phone. For the easiest phone install, publish the folder to a free HTTPS static host, such as GitHub Pages, then open the site on Android Chrome. This initial publishing step needs internet.

### Install
1. Open the hosted HTTPS app in Chrome.
2. Load it once while online and wait for it to finish.
3. Open Chrome's three-dot menu.
4. Choose **Install app** or **Add to Home screen** if shown.
5. Launch BIOLEARN from the new home-screen icon.
6. Test it in airplane mode.

PWA install prompts vary by browser/device. Some browsers may display “Add to Home screen” rather than “Install app”.

## Add more lessons and questions

Open `app.js`. Each lesson is one object inside the `LESSONS` array. Give each lesson a unique `id`, a `level`, `title`, `summary`, `sections`, and `quiz` array. A quiz question uses:

```js
{
  q: "Your question?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  answer: 1,
  explanation: "Why option B is correct."
}
```

The `answer` is a zero-based index: `0` means the first option, `1` the second, and so on. Each included lesson currently has three sample questions. Add more to expand the question bank.

## Offline and privacy notes

- Lesson text and quiz data in this starter are bundled in `app.js`, so they do not require an internet request.
- Progress is saved in browser `localStorage` on the device/browser profile. Clearing site data may erase it; it does not automatically sync to other devices.
- The service worker caches the app shell. Increment `CACHE_NAME` in `service-worker.js` when you make changes so browsers can fetch the new version.
- The app does not currently have online accounts, cloud sync, audio/video downloads or an admin content editor.
- The sample lessons are a starting point, not a complete authoritative national curriculum. Verify and expand content against current NERDC, WAEC, NECO, JAMB and relevant university syllabuses before presenting the app as comprehensive exam preparation.
- Use original questions or properly licensed material. Do not upload copyrighted exam papers without permission.

## Folder contents

- `index.html` — page structure
- `styles.css` — layout and styling
- `app.js` — lessons, quizzes, progress and interactions
- `manifest.json` — installable app metadata
- `service-worker.js` — offline cache
- `icon.svg` — app icon


## Offline Tutor and real AI

The built-in tutor answers using the lesson material bundled in `app.js`. It works offline and makes no network requests, but it is a simple local knowledge helper, not a generative AI model.

For a genuine online AI tutor, connect a provider through a secure server/backend that you control. Do **not** paste a private API key into `app.js` or any file downloaded by the browser; users can inspect those files. Keep the offline tutor as a fallback when there is no internet. Any AI provider may have limits, require an account, or charge for use.
