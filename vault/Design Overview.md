# Design Overview

## Core Gameplay

Proto-Breakout is a classic brick-breaking game inspired by Atari's Breakout (1976).

### Game Loop

1. Player controls paddle at bottom of screen
2. Ball bounces off paddle, walls, and bricks
3. Destroy all bricks to advance to next level
4. Lose all lives → Game Over

### Controls

| Input | Action |
|-------|--------|
| Mouse move | Move paddle |
| Touch drag | Move paddle |
| Arrow keys | Move paddle |
| Space / Click | Launch ball |

### Scoring

| Row | Color | Points |
|-----|-------|--------|
| 1 (top) | Red | 50 |
| 2 | Orange | 40 |
| 3 | Yellow | 30 |
| 4 | Green | 20 |
| 5 (bottom) | Blue | 10 |

## Visual Design

- Dark background (#1a1a2e) for neon contrast
- Bright, saturated colors for game elements
- Rounded rectangles for soft modern look
- Heart icons for lives display

## Audio Design (Planned)

- Paddle hit: short "blip"
- Brick break: crisp "crack" (varies by row)
- Wall bounce: muted "thud"
- Life lost: descending tone
- Level complete: ascending fanfare
- Game over: sad descending tones

## Power-ups (Future)

- Multi-ball (3 balls)
- Paddle expand
- Laser paddle (shoot bricks)
- Sticky paddle (catch ball)
- Fireball (penetrates bricks)

## Variants (Future)

- [[Endless Mode]] - infinite bricks, survival scoring
- [[Time Attack]] - clear levels fastest
- [[Challenge Mode]] - specific puzzle layouts

---

See also:
- [[Tech Stack]] for implementation details
- [[Roadmap]] for development plan
