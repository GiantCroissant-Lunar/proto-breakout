---
name: dev-log
description: "Record a session log at the end of every working session. Use when finishing work — after committing, before ending the session. All agents (Claude Code, Codex, Copilot, etc.) must write a dev-log entry."
category: 00-meta
layer: governance
always_active: true
related_skills:
  - "@context-discovery"
  - "@validation-guard"
  - "@autoloop"
---

# Dev Log

Write a structured session log entry at the end of every working session. This creates a persistent, human-readable trail of work across all agents and sessions.

## When to Write

- **At the end of every session** that produced changes (commits, file edits, research)
- **Before ending your session** — this is the last thing you do
- **Even for research-only sessions** — if you explored code, read docs, or investigated issues, log what you learned

Do NOT skip this. If you did work, log it.

## Where to Write

```
vault/dev-log/YYYY-MM-DD-{slug}.md
```

- `{slug}` is a short kebab-case topic (e.g., `project-setup`, `phaser-scenes`, `breakout-gameplay`)
- If a file with that name already exists, append a counter: `YYYY-MM-DD-{slug}-2.md`
- One file per session, not per day

## Log Format

Every dev-log entry must follow this format:

```markdown
---
date: YYYY-MM-DD
agent: claude-code | codex | copilot | cursor | human | other
branch: mmain
version: 0.1.0
tags: [setup, tooling]
---

# {Title — what was accomplished}

## Summary

{2-3 sentences: what was the goal, what was done, what is the outcome}

## Changes

{List commits made in this session, or files changed if no commits}

- `abc1234` feat: add paddle collision
- `def5678` chore: update Taskfile

## Decisions

{Key decisions made and why — architecture choices, tool selections, trade-offs}

- Used Phaser 4 Arcade Physics for simple breakout mechanics
- Chose Biome over ESLint for faster linting + formatting in one tool

## Blockers

{Issues encountered, unresolved problems, things that need attention}

- None

## Next Steps

{What should be done next, in priority order}

- [ ] Add brick patterns per level
- [ ] Implement power-up system
```

## Rules

1. **Be honest** — log what actually happened, including failures and dead ends
2. **Be concise** — this is a log, not a narrative. Bullet points over paragraphs
3. **Include commit hashes** — so the log links to actual changes
4. **Tag appropriately** — tags help filter logs in Obsidian (e.g., `setup`, `phaser`, `bugfix`, `research`)
5. **Log decisions** — the most valuable part. Future agents and humans need to know *why*, not just *what*
6. **Version field** — use `git describe --tags --always` or package.json version
7. **Agent field** — identify which agent wrote this entry

## How to Get Session Data

| Data | Command |
|---|---|
| Today's commits | `git log --oneline --since="today"` or `git log --oneline HEAD~N..HEAD` |
| Current branch | `git branch --show-current` |
| Current version | `cat package.json | grep version` or `git describe --tags --always` |
| Files changed | `git diff --stat HEAD~N` |
| Date | `date +%Y-%m-%d` |

## Integration

- `@autoloop` — write a dev-log at the end of every autoloop run
- `@context-discovery` — check recent dev-logs during pre-flight to understand what was done last
- `@validation-guard` — after validation passes, remind the agent to write a dev-log before ending

## Obsidian Usage

Dev-logs are browsable in the Obsidian vault. Use Obsidian's search, tags, and graph view to:
- Filter by agent (`agent: claude-code`)
- Filter by tag (`tags: [server]`)
- See work timeline by date
- Link dev-logs to design docs and specs using `[[wikilinks]]`
