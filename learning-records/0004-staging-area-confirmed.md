# Confirmed: he can split one pile of changes into honest commits

Lesson 02 (the staging area) landed. Daniel took six untracked entries and deliberately split
them into two commits whose messages describe their actual contents:

- `4beee75` "Add lesson 01, the glossary, and the shared stylesheet" — 8 files, exactly the
  `lessons reference assets` group
- `48214e6` "Add course notes, resources and learninfg records" — 5 files, the notes group

Both pushed; local and `origin/main` match. He also chose to publish `learning-records/`
rather than hold it back, having been given the choice explicitly.

**Status:** confirmed 2026-09-05.

**Why it matters:** the misconception in [[0003-git-tracks-changes-not-files]] is resolved in
practice, not just in theory — he staged by name, checked with `git status --short`, and wrote
messages after looking at what was in the box. Do not re-teach `add` vs `commit` from scratch.

**Two live artefacts to reuse, both public, both deliberately unfixed:**

- `1845eb6` — message says README, contents are `MISSION.md`. The lesson 02 hook.
- `48214e6` — "learninfg". A typo in a pushed commit message.

Together with `e0c3903` (unattributed author) that is three real defects in his own history,
all fixable only by rewriting it. That is the eventual `--amend` / `filter-repo` lesson, and
it now has better material than any invented example. Still too early to raise.

**Also learned, unprompted:** he hit the pager on `git log` and read `(END)` as a frozen
terminal. Added to the glossary as an untagged entry — a pager belongs to neither git nor
GitHub. He asked for the glossary only, not a lesson edit; respect that.
