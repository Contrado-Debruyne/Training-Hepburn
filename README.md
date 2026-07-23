# Trainer PWA — setup guide

## What's in this folder
- `index.html` — the whole app (timer, editor, storage)
- `sw.js` — service worker: makes the app work offline
- `manifest.webmanifest` — app name, icon, full-screen behavior
- `icon-180.png`, `icon-512.png` — app icons (placeholders — see below)

## 1. Put your own photo on the icon (e.g. David Goggins)
Easiest way — use the included icon maker:
1. Save the photo to your phone (long-press the image → Save / Add to Photos)
2. Open `make-icon.html` in any browser (double-tap it in Files, or open it
   from this folder on a computer)
3. Tap **Choose photo**, pick the saved image — it's auto-cropped square
4. Download both files (`icon-180.png` and `icon-512.png`) — they're already
   correctly sized and named
5. Replace the two placeholder files in this folder with them — done

## 2. Host it free on GitHub Pages (~5 min)
1. Create a free account at https://github.com
2. Click **New repository**, name it e.g. `trainer`, set it **Public**, create
3. Click **uploading an existing file** and drag all 6 files in, then **Commit**
4. Go to **Settings → Pages**, under "Branch" pick `main` + `/ (root)`, **Save**
5. After ~1 minute your app is live at `https://YOURNAME.github.io/trainer/`

(Netlify works too: https://app.netlify.com/drop — just drag the folder in.)

## 3. Install on your iPhone
1. Open the URL in **Safari**
2. Share button → **Add to Home Screen**
3. The icon appears; it launches full-screen, no browser bars
4. After the first load it works **fully offline**

## 4. Updating the app later — WITHOUT losing workouts
Your workouts live in the phone's localStorage. App updates never touch it.
1. Edit/replace the changed files in your GitHub repo
2. Open `sw.js` and bump the version: `trainer-v1` → `trainer-v2`
3. Commit. Next time you open the app online, it refreshes itself
4. All exercises, weights and notes remain exactly as they were

Extra safety nets built into the app:
- The storage key (`trainer.data`) is fixed and versioned — future schema
  changes are migrated in place, never wiped
- **Backup & restore** (bottom of the main screen): copy your data as text
  into Notes before big changes, paste it back any time — this also moves
  your workouts to a new phone or a new hosting URL

## Things to know
- Don't use Safari's "Clear History and Website Data" — that erases
  localStorage (your workouts). Take a backup first if you must.
- The icon photo is for your personal use on your own phone.

## Icon not showing? (troubleshooting)
iOS captures the icon ONLY at the moment you tap "Add to Home Screen".
1. Make sure ALL of these are in the repo root: icon-180.png, icon-512.png,
   apple-touch-icon.png (all three are in this package)
2. Verify the file really loads: open
   https://YOURNAME.github.io/REPO/icon-180.png in the browser —
   you must see the photo. If you see 404, the upload didn't work.
3. Delete the old home-screen icon, reload the app page, add it again.

## Autosave
Edits save themselves ~0.6s after you stop typing, and instantly when you
leave the editor, switch apps or close it. The small line above the buttons
shows "Saving…" then "Saved". "Done" just returns to the list;
"Discard changes" rolls the exercise back to how it was when you opened it
(or removes it entirely if it was brand new).
