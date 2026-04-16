# Arkanoid Brick System (1986)

## Overview

- **Developer:** Taito
- **Release:** 1986 (arcade)
- **Total stages:** 33 (32 regular + 1 boss vs "DOH")
- **Innovation:** Introduced brick types with different behaviors, not just colors

---

## Brick Types

### 1. Colored Bricks (Standard)

All colored bricks are destroyed in **1 hit**. Point values increase by color:

| Color | Points | Notes |
|-------|--------|-------|
| White | 50 | Lowest value |
| Orange | 60 | |
| Cyan | 70 | |
| Green | 80 | |
| Red | 90 | |
| Blue | 100 | |
| Violet | 110 | |
| Yellow | 120 | Highest value |

- **8 color tiers** (vs. 4 in original Breakout)
- Color indicates **point value**, not necessarily difficulty
- All require **1 hit** to destroy

---

### 2. Silver Bricks (Multi-Hit)

- **Initial durability:** 2 hits
- **Progressive scaling:** +1 hit every 8 stages
  - Stages 1–8: 2 hits
  - Stages 9–16: 3 hits
  - Stages 17–24: 4 hits
  - Stages 25–32: 5 hits
- **Scoring:** 50 × stage number (so 50 pts on stage 1, 400 pts on stage 8)
- **Visual:** Metallic/silver appearance
- **Destruction:** Can be destroyed by ball or laser power-up
- **Purpose:** Creates strategic obstacles that require multiple passes

---

### 3. Gold Bricks (Indestructible)

- **Durability:** Infinite (cannot be destroyed)
- **Scoring:** 0 points
- **Purpose:** Pure obstacle — forces ball around them
- **Not counted** toward level completion requirements
- **Visual:** Gold/metallic appearance

---

## Power-Up Capsules

Certain bricks (typically marked differently) release power-up capsules when destroyed. Capsules fall downward and must be caught by the paddle.

| Capsule Color | Effect |
|---------------|--------|
| Red (L) | Laser — paddle shoots projectiles |
| Blue (E) | Enlarge — paddle grows larger |
| Green (C) | Catch — paddle can catch and hold ball |
| Orange (S) | Slow — ball speed decreases |
| Violet (B) | Break — ball penetrates bricks without bouncing |
| Cyan (D) | Disruption — destroys all bricks on screen |
| Gray (P) | Player — extra life |

---

## Stage Layout Principles

### Early Stages (1–8)
- Simple rectangular patterns
- Mostly colored bricks (1-hit)
- Few silver bricks (2-hit)
- Minimal gold obstacles

### Mid Stages (9–20)
- Complex geometric patterns
- More silver bricks (3–4 hit)
- Strategic gold brick placement
- Power-up bricks in key positions

### Late Stages (21–32)
- Intricate maze-like formations
- Heavy silver brick usage (4–5 hit)
- Gold bricks create narrow passages
- Power-ups essential for completion

### Boss Stage (33)
- Final battle against "DOH"
- Unique layout
- No traditional brick-clearing objective

---

## Design Lessons for proto-breakout

1. **Multi-hit bricks** add strategic depth without increasing ball speed
2. **Indestructible obstacles** force creative shot angles
3. **Power-ups** break monotony and enable comeback mechanics
4. **Progressive difficulty** via brick durability (not just speed)
5. **Visual distinction** between brick types is critical (color + texture)
6. **33 stages** is a good target for a full game (vs. 2 in original Breakout)

---

## Implementation Recommendations

For a minimal viable brick system:

```javascript
// Brick type definitions
const BRICK_TYPES = {
  YELLOW: { hits: 1, points: 120, color: '#FFD700' },
  VIOLET: { hits: 1, points: 110, color: '#8B00FF' },
  BLUE:   { hits: 1, points: 100, color: '#0000FF' },
  RED:    { hits: 1, points:  90, color: '#FF0000' },
  GREEN:  { hits: 1, points:  80, color: '#00FF00' },
  CYAN:   { hits: 1, points:  70, color: '#00FFFF' },
  ORANGE: { hits: 1, points:  60, color: '#FFA500' },
  WHITE:  { hits: 1, points:  50, color: '#FFFFFF' },
  SILVER: { hits: 2, points:  50, color: '#C0C0C0', scalable: true },
  GOLD:   { hits: -1, points:   0, color: '#FFD700', indestructible: true }
};
```
