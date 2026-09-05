# Identity vs authentication — taught in lesson 0001

Lesson 0001 established the split between **identity** (who a commit says wrote it; set by
`git config user.email`; immutable once committed) and **authentication** (who may push;
set by `gh auth login`; changeable). This is the frame future lessons should reuse whenever
a permissions or attribution question comes up.

Grounded in a real defect in his own repo: commit `e0c3903` was authored as
`danielcohen@Daniels-MacBook-Pro.local` — a hostname-derived address matching GitHub's
documented invalid case (`jane@computer.local`) — and the GitHub API returned a null linked
user for it. He saw the unattributed commit before the fix and the attributed one after.

**Status:** confirmed 2026-08-30.

**Evidence:** he ran all five steps himself. `git config --global` set name and the noreply
email; `gh auth login` succeeded as `dancohen88`; commit `b794146` was authored as
`321021787+dancohen88@users.noreply.github.com`, pushed, and
`gh api .../commits/b794146 --jq '.author.login'` returned `dancohen88`. Local and remote
HEAD matched, proving the push landed. The repo now shows both commits together — the
attributed one and the unattributed fossil — as a visible before/after.

**Implications:** `e0c3903` is left deliberately unattributed as a visible fossil. It is the
natural hook for teaching history rewriting (`git commit --amend`, `filter-repo`) much later —
do not raise it before he is comfortable, and never suggest rewriting pushed history casually.
