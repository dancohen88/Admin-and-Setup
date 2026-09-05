# GitHub Resources

## Knowledge

- [Book: _Pro Git_ (2nd ed.) by Scott Chacon & Ben Straub](https://git-scm.com/book/en/v2)
  The canonical git text, free and complete online. Written by a GitHub co-founder.
  Use for: what git is actually doing underneath. Ch. 1–2 cover everything in this mission.
  Especially [1.6 First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) — identity is "immutably baked into the commits you start creating."

- [GitHub Docs](https://docs.github.com/en/get-started)
  The primary source for anything GitHub-the-website does, as opposed to git-the-tool.
  Use for: account settings, repo settings, visibility, email/identity rules.
  Key pages:
  - [Setting your commit email address](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address)
  - [Why are my contributions not showing up?](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile) — the exact rules for contribution credit
  - [Email addresses reference](https://docs.github.com/en/account-and-profile/reference/email-addresses-reference) — the `noreply` address formats
  - [Adding locally hosted code to GitHub](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)

- [GitHub Skills — Introduction to GitHub](https://github.com/skills/introduction-to-github)
  Official hands-on course run inside real GitHub Issues with automated feedback.
  Takes under an hour, no prerequisites. Use for: reinforcing lessons with real practice.

- [`gh` CLI manual](https://cli.github.com/manual/)
  Official reference for the `gh` command. Use for: `gh repo create`, `gh auth login` flags.

## Wisdom (Communities)

- [GitHub Community Discussions](https://github.com/orgs/community/discussions)
  GitHub's own forum, staffed by GitHub employees. Use for: "is this supposed to work this way?"
  questions about the platform itself.

- [r/git](https://reddit.com/r/git)
  Focused subreddit for git questions. Higher signal than general programming subs.
  Use for: "I did something and now the repo looks wrong" recovery help.

- [r/learnprogramming](https://reddit.com/r/learnprogramming)
  Large, explicitly beginner-friendly, no-judgement. Use for: foundational questions
  you feel are too basic to ask elsewhere. (They aren't.)

- [Stack Overflow — `git` tag](https://stackoverflow.com/questions/tagged/git)
  Best once you can state a specific, reproducible problem. Nearly every beginner git
  error has already been answered here — search before asking.

## Gaps

- No resource yet chosen for **undoing mistakes** (reset vs revert vs restore). This is a
  named success criterion in [MISSION.md](./MISSION.md); find a high-trust source before
  teaching it. Candidate: [Pro Git 2.4 Undoing Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things).
- No resource yet on **writing good READMEs**. Needed for the "explains the project to a
  stranger" success criterion.
