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

## Sounds
Each phase has its own cue so you can train without looking at the screen:
- Heavy set start : low two-note punch
- Light set start : bright rising chirp
- Set finished    : falling two-note "rack it"
- Rest            : falling notes + soft low pad
- Halfway through a work set (20s+) : single soft tick
- Last 3 seconds of any phase       : short ticks
- Workout complete: rising three-note fanfare

Main screen -> "Sound settings": mute, volume, halfway cue on/off, and
buttons to preview every cue. Settings are saved with your workouts.

iPhone note: the ring/silent switch must be set to RING, otherwise iOS
mutes all web audio.

## Sound not working? / Background operation
- The app now plays a NEAR-SILENT audio track while the timer runs. This is
  the mechanism that (a) keeps the timer alive when you switch to another
  app and (b) routes cues as "media" audio, which plays even with the
  ring/silent switch on silent.
- You may see the app in the iOS media controls while a workout runs —
  that's expected; it's what keeps it running in the background.
- Still silent? Check: in-app Sound settings not muted, phone volume up
  (the side volume buttons while the app is open), and Screen Time /
  Focus modes not restricting the site.
- Limits: iOS can still terminate any background page under memory
  pressure. If that happens, the timer resyncs to the correct time the
  moment you reopen it — elapsed sets are accounted for.

## Run mode
Run exercises no longer use heavy/light sets. Instead you set the number of
SPRINTS with its own stepper, choose the distance unit (m or km), and enter
a distance per sprint. Reps fields are hidden for runs. Existing run
exercises are migrated automatically: their old heavy+light count becomes
the sprint count.

## YouTube videos
Each exercise can hold any number of YouTube links (editor -> "YouTube
videos" -> + Add video link). They appear as tappable pills on the
exercise card and on the timer screen, opening in YouTube - handy for
checking form during rest. The background audio session keeps your timer
running while you watch. Empty link rows are cleaned up automatically.

## Workouts
Build named workouts of multiple exercises performed back to back:
main screen -> "+ New workout" -> name it, set the rest between exercises,
then add exercises (pick existing ones or create new ones on the spot,
reordering with the arrows). Each exercise keeps its own sets, reps,
work/rest timers, equipment note, and YouTube videos. The runner chains
everything: get-ready -> exercise 1's sets -> "Next: ..." rest -> exercise
2's sets -> ... -> finish fanfare. The header shows which exercise you're
on (e.g. "Squats - 2/5") and the video pills switch to the current
exercise. An "Equipment (optional)" field was added to every exercise for
non-weight gear (bands, kettlebells, bodyweight...).

## Workouts v2 - block-based (version 12)
A workout is now a sequence of BLOCKS of different kinds:
- Exercise block: strength/run from your library (sets, reps, weights,
  sprints, its timers, videos, equipment)
- Timed session block: a named list of steps, each with its own timer and
  optional rest between steps - for stretching, mobility, breathing
- Video session: a timed session prefilled with one long step and a video
  link - for following a yoga class etc.
Build: + New workout -> + Add block -> choose the kind. Tap any block to
edit it; reorder with arrows. The runner chains everything with your
"rest between blocks" transition announcing what's next. Old workouts are
migrated automatically (each exercise became an exercise block).

## Background sound fix (v15)
Cues are now pre-rendered audio files played through media elements
instead of live-synthesized tones. iOS suspends synthesized audio the
moment you switch apps, which is why cues only fired on return; media
playback continues in the background, so set changes now sound on time
while you're in another app. First tap in the app "blesses" all cue
sounds so they're allowed to auto-play later.
