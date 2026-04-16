# Skills Index

Numbered categories create an implicit dependency hierarchy — lower numbers are more foundational and consumed by higher-numbered layers.

## 00-meta — Governance & Meta-Skills

| Skill | Description | Related Skills |
|---|---|---|
| `skill-creator` | Create, test, and improve agent skills. Meta-skill for the skill system itself. | — |
| `rfc-orchestrator` | Map RFC features to skill compositions and dispatch implementation phases. | `@context-discovery`, `@validation-guard` |
| `context-discovery` | **Mandatory pre-flight**: scan project state, check Phaser/server/tooling health, produce ContextReport before any implementation. | `@rfc-orchestrator`, `@validation-guard` |
| `validation-guard` | **Mandatory post-flight**: verify linting, mandatory rule compliance, build integrity, pre-commit checks after implementation. | `@rfc-orchestrator`, `@context-discovery` |
| `autoloop` | Autonomous iteration protocol — keep/discard cycle, git-as-state-machine, context window management, simplicity-weighted evaluation. | `@rfc-orchestrator`, `@validation-guard`, `@skill-creator` |
| `implementation-review` | Three-pass code review: Pass 0 design intent vs RFC, Pass 1 critical issues, Pass 2 informational. AUTO/ASK/ESCALATE triage. | `@rfc-orchestrator`, `@validation-guard`, `@context-discovery` |
| `rfc-review` | Structured RFC review with quantitative scoring across 6 dimensions. | `@rfc-orchestrator`, `@context-discovery` |
| `dev-log` | **Mandatory end-of-session**: write a structured log entry to `vault/dev-log/` recording what was done, decisions made, and next steps. All agents must use this. | `@context-discovery`, `@validation-guard`, `@autoloop` |

## 01-phaser — Phaser 4 Engine Reference

| Skill | Description | Related Skills |
|---|---|---|
| `scenes` | Scene lifecycle, transitions, parallel scenes, SceneManager, cross-scene communication. | `@game-setup-and-config`, `@loading-assets` |
| `game-setup-and-config` | Game config, scale modes, renderer selection, plugins, boot process. | `@scenes` |
| `loading-assets` | Asset loading, pack files, preload lifecycle, progress tracking, asset keys. | `@scenes`, `@sprites-and-images` |
| `sprites-and-images` | Sprites, textures, frames, animations, sprite sheets, texture atlases. | `@loading-assets`, `@animations` |
| `animations` | Animation controller, frame events, animation curves, timeline-based animation. | `@sprites-and-images`, `@tweens` |
| `graphics-and-shapes` | Graphics API, drawing shapes, paths, fills, strokes, geometry. | `@sprites-and-images` |
| `physics-arcade` | Arcade physics: bodies, velocity, acceleration, drag, gravity, collisions, overlap. | `@scenes`, `@groups-and-containers` |
| `input-keyboard-mouse-touch` | Input plugins: keyboard, mouse, touch, pointers, gestures. | `@scenes` |
| `text-and-bitmaptext` | Text objects, bitmap fonts, text styles, dynamic text. | `@sprites-and-images`, `@loading-assets` |
| `time-and-timers` | Clock, delta time, timers, delayed calls, time scale. | `@scenes` |
| `tweens` | Tween manager, tween chains, timelines, easing functions. | `@animations`, `@scenes` |
| `particles` | Particle emitter manager, zones, death callbacks, particle effects. | `@sprites-and-images`, `@graphics-and-shapes` |
| `groups-and-containers` | Groups, containers, display list management, z-order. | `@scenes`, `@physics-arcade` |
| `scale-and-responsive` | Scale manager, responsive design, fullscreen, orientation. | `@game-setup-and-config` |
| `events-system` | EventEmitter, custom events, event propagation, global events. | `@scenes` |
| `audio-and-sound` | Sound manager, HTML5 Audio, Web Audio, sound pools, spatial audio. | `@loading-assets` |
| `v4-new-features` | Phaser 4 new features, breaking changes from Phaser 3, migration guide. | — |

## 02-tooling — Automation & Reference

| Skill | Description | Related Skills |
|---|---|---|
| `agent-browser` | Browser automation CLI — navigate, snapshot, interact, screenshot, scrape, test web apps. | — |
| `repomix` | Pack repo/files into single AI-friendly file for LLM context, external review, docs generation. | `@context-discovery` |

## 03-presentation — UI & Design

| Skill | Description | Related Skills |
|---|---|---|
| `ui-ux-pro-max` | UI/UX design intelligence — 67 styles, 96 palettes, 57 font pairings, 25 charts, 13 stacks. Searchable database with BM25 search and design system generation. | — |

## Agent Workflow

**Standard** (human-in-the-loop):
```
@context-discovery → @rfc-orchestrator → Load skills → Implement → @validation-guard → task check
```

**Autonomous** (via `@autoloop` — hands-free iterative implementation):
```
@context-discovery → @rfc-orchestrator → Create branch → LOOP { implement → commit → lint → @validation-guard (inline) → keep/discard → log } → Full validation → Report
```

## Frontmatter Schema

Every SKILL.md has YAML frontmatter with these fields:

```yaml
---
name: skill-name                    # Unique identifier
description: ...                    # Triggers skill loading — be specific
category: 00-meta                   # Numbered category directory
layer: governance|presentation|tooling|engine
always_active: true|false           # If true, rules apply to ALL code (optional)
related_skills:                     # @skill-name cross-references
  - "@validation-guard"
---
```

**Layers** (implicit dependency: lower consumes higher):
- `governance` — meta-skills that orchestrate other skills
- `engine` — engine-specific reference (Phaser 4 API, quirks)
- `presentation` — UI/UX design
- `tooling` — automation, browser, docs, search

## Conventions

- **Cross-references** use `@skill-name` notation (e.g., `@validation-guard`)
- **Mandatory rules** (enforced via `@validation-guard`):
  1. All JS uses `const`/`let`, never `var`
  2. Biome lint + format must pass before committing
  3. No hardcoded ports or secrets in source
  4. Build artifacts never committed to git
  5. Phaser config via environment variables where applicable
  6. Pre-commit hook must pass
