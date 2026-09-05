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
- 0003: `gh repo create` — publishing a brand-new project from an empty folder
- 0004: undoing things — `restore`, `revert` (avoid `reset --hard` early)
- 0005: `.gitignore` — keeping secrets and junk out of a public repo
- 0006: READMEs that explain a project to a stranger
- 0007: private vs public, and switching between them

Lesson 02 leaves two questions deliberately dangling for 0004, seeded in its ask box: taking
something back out of the staging area, and regretting a commit message.
