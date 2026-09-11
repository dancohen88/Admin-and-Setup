# Notes

## Teaching preferences

- **Lesson length: 10–15 minutes.** Stated explicitly. One idea per lesson. Do not exceed.
- **Total beginner.** Never assume vocabulary. Every new term goes in the
  [glossary](./reference/0001-glossary.html) on first use.
- **Design: modern documentation.** Chosen 2026-08-30 after rejecting the initial Tufte
  treatment as "pretty ugly." Sans-serif, strong hierarchy, dark terminal blocks, cards.
  Palette encodes the course's core duality — amber `#a8451c` = git (the offline tool),
  steel blue `#31597f` = GitHub (the website). Type: Archivo / Source Sans 3 / IBM Plex Mono.
  Do not drift back to serif/cream.
- **Delivery: local file + published Artifact.** He opened the raw HTML in VSCode and
  couldn't find the lesson — `file://` is not a good primary reading surface. Every lesson
  ships as both.

## Publishing workflow

Local `./lessons/*.html` and `./reference/*.html` are the source of truth and link
`../assets/course.css`. Artifacts must be self-contained, so build before publishing:

```
python3 assets/build-artifact.py lessons/0001-foo.html /tmp/out.html
```

This inlines the CSS/JS, strips the document wrapper, and rewrites local links using
`assets/artifact-urls.json`. Record every new artifact URL in that file, then rebuild any
page that links to the new one so cross-links resolve. Republishing the **same scratchpad
file path** in a session keeps the same URL; from a new session pass `url=` instead.

**Gotcha:** never put a literal `</script>` in `assets/*.js`, even inside a comment — it
closes the block early once inlined. The build script escapes it, but keep the sources clean.

**Fixed 2026-09-04:** `strip_wrapper`'s `</?head[^>]*>` also ate `<header class="masthead">`,
so every published lesson lost its masthead wrapper (and its 3.5rem top padding) while the
local file looked correct. It now uses a `(?=[\s>])` lookahead. Lessons 01-02 and the glossary
were rebuilt and republished. Any future tag-stripping regex needs the same guard.

## Published artifacts

| Page | URL |
|---|---|
| Lesson 01 — Your Name on Your Work | https://claude.ai/code/artifact/f40efd85-ad06-4d42-a7f2-f54eb0bf038f |
| Lesson 02 — What Goes in the Snapshot | https://claude.ai/code/artifact/f6a32d9c-2db4-42b3-917a-b065af97c523 |
| Lesson 03 — From Folder to Repository | https://claude.ai/code/artifact/be3141fd-cd53-447a-a3fe-6aae2c17602d |
| Reference 01 — Git & GitHub Glossary | https://claude.ai/code/artifact/7a469085-d1f4-49d2-84bd-5fedc0d9bc01 |

## Environment (verified 2026-08-30)

- macOS (Darwin 25.6.0), zsh
- `git` 2.50.1 (Apple Git-155)
- `gh` 2.98.0 — **installed but not authenticated** as of 2026-08-30
- `credential.helper=osxkeychain` is set globally
- GitHub account: `dancohen88` (ID `321021787`, created 2026-08-25, 2 public repos)
- noreply address: `321021787+dancohen88@users.noreply.github.com`

## Open threads

- `git config --global user.name` / `user.email` were **unset** at workspace start.
  Lesson 0001 fixes this. Verify it stuck before teaching anything else.
- The `Admin and Setup` repo's README claims it is "ready to be published" but it was
  already pushed to `dancohen88/Admin-and-Setup` (public). Stale text — used as the
  editing target in lesson 0001.
- Daniel didn't push that repo himself — a prior agent session did. He has therefore
  **never run `git push` by hand**. Don't assume the muscle memory exists. *(Resolved: he has
  now run the full loop twice unaided — commits `b794146` and `1845eb6`.)*
- Commit `1845eb6` is messaged "Update README to reflect published state" but contains
  **`MISSION.md` only** — the README isn't in it. Pushed, so it's public. This is the opening
  hook of lesson 02 and must stay unfixed: it is the second deliberate fossil, alongside
  `e0c3903`. Two live examples ready for the eventual history-rewriting lesson.

## Ideas for future lessons

Reordered 2026-09-04: 0002 became the staging area rather than `gh repo create`, because
lesson 01 promised it and learning record 0003 showed the misconception was live. Publishing
a new project moves to 0003 — it needs the commit loop understood first.

- ~~0002: `gh repo create`~~ → written as **What Goes in the Snapshot** (the staging area)
- ~~0003~~ → **From Folder to Repository** — taught and confirmed 2026-09-07, see
  [[learning-records/0005-first-unaided-publish]]. `dancohen88/mosslight-hollow` is public.
- 0004: undoing things — **next, and now partly pre-taught.** He used `git commit --amend` for
  real on 2026-09-07 to fix an unpushed bad message. Open from that, don't re-derive it, and
  spend the lesson on what amend *can't* touch: `restore`, `revert`, and already-pushed history.
  (Avoid `reset --hard` early.) `family-planner` / `Cosy Crawler 2` are the follow-on cleanup.
- 0005: `.gitignore` — keeping secrets and junk out of a public repo
- 0006: READMEs that explain a project to a stranger
- 0007: private vs public, and switching between them

Lesson 02 leaves two questions deliberately dangling for 0004, seeded in its ask box: taking
something back out of the staging area, and regretting a commit message. Lesson 03 adds a third
hook for 0004 in its closing section — publishing fast means publishing mistakes fast.

## Lesson 03 subject matter (chosen 2026-09-05)

Used his real unpublished work rather than an invented empty folder, because the mission's first
success criterion is publishing *a project*, and he had three sitting there.

- **`~/Sandbox/Cosy Dungeon Crawler`** — the subject. 27 files, 244 KB, no `.git`, **zero
  installed dependencies**, no `.env`, no `.DS_Store`, no files over 1 MB. Verified clean before
  writing the lesson; that is what makes `git add .` defensible on this one project.
- `package.json` calls it **`mosslight-hollow`** — "A cozy top-down lo-fi dungeon crawler, built
  with vanilla HTML/CSS/JS Canvas." The lesson uses that as the repo name over the folder name,
  and as the source of the stub README's wording.
- It has **no README**. Lesson 03 adds a placeholder and explicitly defers real README work to 0006.

**Corrected 2026-09-07 — `family-planner` is NOT unaided practice.** The original note here said
publishing it was "only steps 5–6." Wrong: it already has an `origin` (`dancohen88/family`), and
local `main` (`d1957ae`) diverged from remote (`e4a97bc`) on 2026-08-26 — before this course
began, via prior agent sessions. Sending a beginner into that is sending him into a divergence he
has no tools for. Lesson 03's closing paragraph was rewritten and republished to say so; the
unaided rep is now "run the whole sequence on the next new thing you start."

**Solved 2026-09-07 — `~/Sandbox/Cosy Crawler 2`.** Not a mystery. The `family` remote was renamed
'family' → 'games' and absorbed Cosy Crawler 2 under `cosy-crawler-2/` in commits `9be4944` /
`781e8b6`; the local 17 MB `.git` with no working tree is the leftover. Same tangle as
`family-planner`, same fix: after lesson 04.

**Environment fact:** `init.defaultBranch` was unset as of 2026-09-05, so `git init` would have
produced `master` plus a hint paragraph. Lesson 03 step 1 sets it to `main`.

## Next mission after this one (decided 2026-09-05)

**Terminal basics.** Chosen by Daniel over the alternative recommendation, GitHub Pages
(deploying `mosslight-hollow` to a playable URL rather than leaving it as source). Pages is
not rejected, just deferred — it remains the obvious follow-on once the shell is comfortable.

Rationale for terminal basics: he is already tripping over shell concepts sideways inside git
lessons rather than meeting them head on — the `(END)` pager incident in
[[learning-records/0004-staging-area-confirmed]] is the clearest case. It is the substrate under
everything else, and it is small. Likely ground: paths and `cd`, what a pager is and how to leave
one, pipes and redirection, quoting (his own directory names contain spaces), and reading a
command's own help.

**Ordering: finish this mission first.** Lessons 04–07 (undoing, `.gitignore`, READMEs, visibility)
are still unwritten and three MISSION.md success criteria are still unmet. Undoing is the priority
of those four — he can currently publish confidently but not recover confidently.
