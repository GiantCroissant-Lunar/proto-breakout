# Classic Brick-Breaker Brick Type Comparison

## Evolution of Brick Types Across Games

| Game | Year | Brick Types | Multi-Hit | Indestructible | Power-Ups | Stages |
|------|------|-------------|-----------|----------------|-----------|--------|
| Breakout | 1976 | 4 (colors only) | No | No | No | 2 |
| Super Breakout | 1978 | 2-3 per mode | No | No | No | ∞ (Progressive) |
| Arkanoid | 1986 | 10 (8 color + silver + gold) | Yes (silver) | Yes (gold) | Yes (7 types) | 33 |
| Arkanoid: Revenge of Doh | 1987 | 12+ | Yes | Yes | Yes | 34 |
| DX-Ball 2 | 1998 | 15+ | Yes | Yes | Yes (many) | 150+ |

---

## Brick Behavior Taxonomy

### By Durability

| Category | Behavior | First Appeared |
|----------|----------|----------------|
| **1-Hit** | Destroyed on contact | Breakout (1976) |
| **Multi-Hit** | Requires N hits, visual damage per hit | Arkanoid (1986) — silver |
| **Progressive** | Hits increase with stage number | Arkanoid (1986) — silver |
| **Indestructible** | Cannot be destroyed | Arkanoid (1986) — gold |
| **Regenerating** | Rebuilds after timer | Revenge of Doh (1987) |
| **Invisible** | Only visible near ball | DX-Ball 2 (1998) |
| **Explosive** | Destroys neighbors on death | DX-Ball 2 (1998) |

### By Movement

| Category | Behavior | First Appeared |
|----------|----------|----------------|
| **Static** | Fixed position | Breakout (1976) |
| **Descending** | Wall moves down over time | Super Breakout (1978) — Progressive |
| **Moving** | Slides left/right | Revenge of Doh (1987) |
| **Appearing** | New rows spawn at top | Super Breakout (1978) |

### By Scoring

| Category | Behavior | Example |
|----------|----------|---------|
| **Fixed** | Constant point value | Breakout yellow = 1 pt always |
| **Color-coded** | Different colors = different values | Arkanoid white=50, yellow=120 |
| **Stage-scaled** | Value × stage number | Arkanoid silver = 50 × stage |
| **Combo** | Higher score for consecutive hits | Modern brick-breakers |

---

## Color-to-Point Mapping Comparison

### Atari Breakout (1976) — Bottom to Top
```
Yellow (1pt) → Green (3pt) → Orange (5pt) → Red (7pt)
```
- **Rule:** Higher bricks = more points (harder to reach)

### Arkanoid (1986) — 8 tiers
```
White (50) → Orange (60) → Cyan (70) → Green (80) → Red (90) → Blue (100) → Violet (110) → Yellow (120)
```
- **Rule:** More colors = more visual variety, finer scoring granularity

### Common Pattern
- **Red/orange/green/yellow** appear in almost every brick-breaker
- **Blue/cyan/violet/white** were added by Arkanoid
- Point values generally follow: **yellow > red > blue > green > orange > white**

---

## Stage Layout Patterns

### Common Patterns Across Games

1. **Full Wall** — Every position filled (original Breakout)
2. **Alternating Rows** — Row on, row off
3. **Checkerboard** — Every other brick present
4. **Diamond** — Center bricks only
5. **Inverted Pyramid** — Wide at top, narrow at bottom
6. **Frame** — Outer ring of bricks
7. **Scattered** — Random-looking placement
8. **Picture** — Bricks form recognizable shapes
9. **Maze** — Paths and corridors (with gold/indestructible walls)
10. **Boss Shape** — Bricks form the shape of an enemy

### Layout Complexity Progression

```
Stage 1-5:   Full walls, simple rows
Stage 6-10:  Geometric patterns with gaps
Stage 11-15: Mix of destructible and indestructible
Stage 16-20: Complex mazes, narrow passages
Stage 21-25: Asymmetric, puzzle-like layouts
Stage 26-30: Maximum difficulty, tight clearances
Stage 31-33: Boss stages, unique mechanics
```

---

## Recommended Brick Types for proto-breakout

### Tier 1 — Minimal (MVP)
- **Standard** (1-hit, color-coded points)
- **Tough** (2-3 hits, visual damage feedback)
- **Steel** (indestructible obstacle)

### Tier 2 — Enhanced
- Add all Tier 1 types, plus:
- **Explosive** (destroys adjacent bricks on death)
- **Invisible** (revealed when ball is nearby)

### Tier 3 — Full Feature
- Add all Tier 2 types, plus:
- **Regenerating** (rebuilds after a timer)
- **Moving** (slides sideways)
- **Power-up brick** (drops a random power-up)
