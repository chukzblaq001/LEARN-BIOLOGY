# BioLearn — Biology Learning Hub

## Included in this version
- 100 Biology topics and 1,000 topic-practice questions (10 per topic).
- Notes and explanations, topic completion, local progress history and responsive design.
- JAMB UTME, WAEC, NECO and Mixed Biology practice tracks.
- Practice mode and timed CBT mode.
- Difficulty selector: All, Easy, Medium and Challenging. Difficulty labels are first-pass automated estimates, not official exam classifications.
- Results include topic coverage and difficulty mix for the questions that appeared. This is practice feedback, not an official exam blueprint.
- 30 additional original scenario-style questions (10 per named exam track) supplement the 1,000 topic-bank questions.
- PWA manifest, service worker and BioLearn app icons for supported HTTPS hosting.
- Local student display profile plus progress export/import backup.
- Local custom-question admin tool (`admin.html`) with add/edit/delete and JSON import/export.
- Structured lesson layout with learning objectives, note points and a self-check prompt.

## Open locally
1. Download and extract the ZIP.
2. Open the `BioLearn` folder.
3. Double-click `index.html` in a modern browser.
4. Select an exam track, choose a difficulty, select Practice or Timed CBT, and begin.

## Install on an Android phone
1. Publish the website over HTTPS (GitHub Pages is suitable).
2. Open the published BioLearn website in Chrome on your Android phone.
3. Open Chrome's menu (three dots) and choose **Install app** or **Add to Home screen** if offered.
4. Follow the prompt. The installed app should use the BioLearn book icon.
5. If an older version still appears, close and reopen the site, then refresh. The offline cache was updated to `biolearn-v7`.

## Upload to GitHub Pages
Upload the contents of this folder to the repository while preserving the `css` and `js` folders. Replace the older files rather than uploading only one file. After publishing, hard-refresh the site; the service-worker cache was updated to `biolearn-v7`. Include the `assets` folder so the app icons load.

## Important content note
These are original practice questions, not official past questions. The 30 supplemental scenario questions have authored explanations; the difficulty tags for the larger existing bank are automated first-pass estimates. Have a Biology teacher review content, distractors and alignment with current JAMB, WAEC and NECO syllabuses before relying on it as an exam-preparation authority.


## Student profiles and progress backup
- Enter a display name in **My progress** and save it.
- Use **Export progress backup** to save progress as a JSON file.
- On another device, open BioLearn and use **Import progress backup** to restore it.
- This is not cloud sync: browser storage does not automatically transfer between devices. True online accounts and sync require a backend/authentication service and secure deployment configuration.

## Admin question editor
- Open `admin.html` from the website navigation.
- Add a question, select its topic, enter four different options, choose the correct option and write an explanation.
- Edit/delete custom questions, or export/import a JSON array of reviewed questions.
- Custom questions are saved only in that browser. For a public multi-user service, do not treat this local editor as secure admin authentication.

## Before public release
1. Publish over HTTPS and test on desktop plus Android Chrome.
2. Test each JAMB, WAEC, NECO and Mixed track in both practice and timed modes.
3. Verify progress backup export/import on a second browser/device.
4. Have a qualified Biology teacher review all question wording, answer keys, explanations and syllabus alignment.
5. Publish a privacy notice explaining local storage and what information is or is not collected.
6. For online student accounts, cloud progress sync, and secure remote admin, connect a real backend/authentication provider and configure its access rules. Those server services are not included in this static ZIP.
