---
name: validation-guard
description: Post-implementation verification — checks Phaser project code quality, mandatory rule compliance, and linting. Run AFTER completing any implementation work to catch violations before committing.
category: 00-meta
layer: governance
always_active: false
related_skills:
  - "@rfc-orchestrator"
  - "@context-discovery"
  - "@autoloop"
---

# Validation Guard

Run this skill **after** completing implementation work. It verifies that code meets project standards and catches violations before they're committed.

## When to Run

- After implementing a feature
- After modifying JS/HTML files
- After any significant code change
- Before committing (final gate)

## Validation Checks

### Check 1: Linting

```
JS/HTML (biome):
  task lint
  Pass: Zero errors
  Fail: List all errors — fix before proceeding
```

### Check 2: Mandatory Rules

Scan all new/modified files for violations:

| Rule | Scope | Grep Pattern | Fix |
|---|---|---|---|
| No hardcoded ports | JS | Literal port numbers in logic | Use env vars or config |
| No console.log in production | JS | `console\.log` in non-dev files | Remove or use logger |
| No var declarations | JS | `\bvar\b` | Use `const` or `let` |
| Template literals preferred | JS | String concatenation with `+` | Use template literals |
| Semicolons always | JS | Missing semicolons | Add semicolons |
| Trailing commas (ES5) | JS | Missing in multiline objects | Add trailing commas |

### Check 3: Phaser Project Integrity

```
Checks:
- [ ] project/index.html loads without console errors
- [ ] All scene classes defined before config.js references them
- [ ] No .task/ or node_modules/ staged in git
- [ ] Phaser build (phaser-*.js) present in project/
```

### Check 4: Pre-commit Dry Run

```
task hooks:install && git add . && pre-commit run
Pass: All hooks pass
Fail: List failures — fix before proceeding
```

## Validation Report Format

```markdown
## ValidationReport — [date]

### Linting: PASS/FAIL
| Linter | Status | Issues |
|---|---|---|
| biome | PASS | — |

### Mandatory Rules: PASS/FAIL
| Rule | Status | Violations |
|---|---|---|
| No hardcoded ports | PASS | — |
| No console.log | PASS | — |
| No var declarations | PASS | — |
| Template literals | PASS | — |
| Semicolons always | PASS | — |
| Trailing commas | PASS | — |

### Phaser Integrity: PASS/FAIL
[issues if any]

### Pre-commit: PASS/FAIL
[failures if any]

### Overall: PASS/FAIL
[summary of what needs fixing]
```

## Severity Levels

- **BLOCK**: Must fix before committing (lint errors, mandatory rule violations)
- **WARN**: Should fix but won't break builds (missing docs, incomplete comments)
- **INFO**: Suggestions for improvement (naming, organization)

## How to Execute

| Check | Tool/Command |
|---|---|
| JS/HTML lint | `task lint` |
| Lint + fix | `task lint:fix` |
| Format | `task format` |
| Pre-commit | `task hooks:install` then `git add .` |
| Git diff | `git diff --name-only` for modified files scope |

## Inline Mode (for @autoloop iterations)

When called inside an autoloop iteration, run a **lightweight inline check**:

```
INLINE VALIDATION (fast — for each loop iteration):
  1. Linting — biome on CHANGED FILES ONLY
  2. Mandatory rules — grep only the FILES CHANGED in this iteration
  3. Pre-commit dry run on staged files
  Skip: full project integrity check
  (these run in full validation at loop end)

RETURN:
  - PASS: no blockers found
  - BLOCK: list violations (autoloop will attempt fix or discard)
  - WARN: list warnings (autoloop will keep but log)
```

## Related Skills

- `@autoloop` (00-meta) — invokes validation as the measure step in each loop iteration
- `@context-discovery` (00-meta) — run before implementation
- `@rfc-orchestrator` (00-meta) — determines what was supposed to be built
