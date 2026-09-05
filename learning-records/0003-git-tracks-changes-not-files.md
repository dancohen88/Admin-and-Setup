# Misconception corrected: git commits changes, not files

Daniel ran `git add README.md && git commit && git push` on an **unmodified** file and got
"nothing added to commit" followed by "Everything up-to-date". The underlying expectation was
that naming a file in `git add` is what includes it — that `add` operates on files.

It doesn't: `add` stages *differences*. An unchanged file is invisible to git no matter how
many times it is named. Once he saved the edit, the identical three commands worked.

**Why it matters:** this is the same mental model that makes the staging area confusing, so
lesson 02 should build directly on it rather than re-introducing the idea from scratch. Frame
the staging area as "which of my changes go in this snapshot," never as "which files."

**Related:** the root cause was a missing save in the editor, not a git error. Worth checking
file mtime before debugging git when a change "isn't showing up." See
[[0002-identity-vs-authentication]].
