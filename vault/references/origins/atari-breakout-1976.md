# Atari Breakout (1976)

## Overview

- **Release:** May 13, 1976
- **Designer:** Nolan Bushnell, Steve Bristow
- **Programmers:** Steve Wozniak (prototype), Gary Waters (production)
- **Hardware:** Discrete logic (no microprocessor — entirely TTL chips)
- **Display:** Black & white monitor with colored cellophane overlays
- **Influenced by:** Atari Pong (1972)

## Brick Layout

The game has a **single fixed layout** — no stage variations:

```
Row 8 (top):    R R R R R R R R R R R R R R   ← Red (7 pts each)
Row 7:          R R R R R R R R R R R R R R   ← Red (7 pts each)
Row 6:          O O O O O O O O O O O O O O   ← Orange (5 pts each)
Row 5:          O O O O O O O O O O O O O O   ← Orange (5 pts each)
Row 4:          G G G G G G G G G G G G G G   ← Green (3 pts each)
Row 3:          G G G G G G G G G G G G G G   ← Green (3 pts each)
Row 2:          Y Y Y Y Y Y Y Y Y Y Y Y Y Y   ← Yellow (1 pt each)
Row 1 (bottom): Y Y Y Y Y Y Y Y Y Y Y Y Y Y   ← Yellow (1 pt each)
```

- **8 rows** × **14 bricks per row** = **112 bricks total**
- **2 rows per color** (4 colors)
- Brick field occupies the **top ~⅓ of the screen**
- Bricks have **small gaps** between them (not touching)

## Scoring

| Color | Rows | Bricks | Points Each | Subtotal |
|-------|------|--------|-------------|----------|
| Yellow | 1–2 | 28 | 1 | 28 |
| Green | 3–4 | 28 | 3 | 84 |
| Orange | 5–6 | 28 | 5 | 140 |
| Red | 7–8 | 28 | 7 | 196 |
| **Total** | | **112** | | **448** |

- **Max score:** 896 points (2 identical screens × 448)
- Secret 2-player mode allows a 3rd screen (max 1,344 points)

## Gameplay Mechanics

### Lives
- **3 lives/turns** per game

### Paddle Behavior
- Paddle **shrinks to ½ size** after the ball breaks through the red row and hits the upper wall
- This is the primary late-game difficulty mechanic

### Ball Speed Increases
Ball speed increases at these triggers:
1. After **4 hits** total
2. After **12 hits** total
3. After ball **contacts orange row**
4. After ball **contacts red row**

### Stage Progression
- Only **2 screens** total, both with identical layouts
- After clearing both, the ball harmlessly bounces off empty walls
- No "game complete" screen — the game just continues aimlessly

## Key Design Principles

1. **Color = value:** Higher bricks are worth more (red > orange > green > yellow)
2. **Escalating difficulty:** Ball speed increases + paddle shrink create a difficulty curve
3. **Fixed layout:** No procedural generation — pure skill challenge
4. **Minimalism:** 4 brick types, 1 layout, pure reflex gameplay
