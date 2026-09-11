# Confirmed: he published a project to GitHub, and recovered a half-failed command

Lesson 03 landed on 2026-09-07. `~/Sandbox/Cosy Dungeon Crawler` is now
`dancohen88/mosslight-hollow` (public): 30 tree entries, commit `f1f0388` authored as
`321021787+dancohen88@users.noreply.github.com` and resolving to `dancohen88` via the API.
Local and `origin/main` match. **MISSION.md success criterion #1 is met.**

He did not get a clean run, and that is the valuable part.

**1. Wrong-directory commit, fixed with `--amend`.** He committed the *course repo's* lesson
files under the message `initial commit:Mosslight Hallow` (commit later replaced by `91dd035`) —
right files, a message describing a different repo, almost certainly an up-arrow recall in the
wrong terminal tab. Caught while still unpushed, so `git commit --amend -m ...` fixed it
cleanly. He has now met amend-before-push a full lesson before 0004 covers it, and met the rule
that makes it safe: rewriting is free until you push.

**2. `gh repo create` ran without `--source=.`.** It created an empty repo on GitHub and did
neither of its other two jobs — no `origin` locally, no push. Re-running was impossible (name
taken). He recovered with `git remote add origin <url>` + `git push -u origin main`.

**Implications for teaching:**

- Do not re-teach `--amend` from scratch in 0004; open from *his* use of it and extend to
  `restore` / `revert`, i.e. the cases where the commit is already public and amend is barred.
- He has seen `gh repo create` decomposed into create + `remote add` + `push -u`. Reuse that —
  it is a better mental model than treating the wrapper as atomic.
- **Working directory is his live failure mode**, hit twice in two days. Reinforces the terminal
  mission (see NOTES.md): lead with `pwd`, prompt-reading, and `cd` with quoted paths.

**Corrected assumption:** NOTES.md called `family-planner` "good unaided practice." It is not.
Its `origin` is `dancohen88/family`, and local `main` (`d1957ae`) diverged from remote
(`e4a97bc`) on 2026-08-26 — before this course began, via prior agent sessions. The remote has
since been renamed 'family' → 'games' and absorbed Cosy Crawler 2 under `cosy-crawler-2/`,
which also explains the mystery `~/Sandbox/Cosy Crawler 2` directory. Untangling it needs
0004 first. Flagged to him as not-his-fault; he has been told to leave it alone.

**Still deliberately unfixed and public:** `e0c3903` (unattributed author), `1845eb6` (message
says README, contents are MISSION.md), `48214e6` ("learninfg"). The near-miss with
`initial commit:Mosslight Hallow` is now a fourth example of the same failure — and the only
one he caught in time, which makes it the best opening for the eventual history-rewriting lesson.
