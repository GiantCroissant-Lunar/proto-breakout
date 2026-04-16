# Breakout Clone Sprite & Design Specification

Complete reference for creating an identical Breakout (1976) clone.

---

## Reference Images

All reference images saved in `vault/references/images/`:

### Breakout (1976)
| File | Description | Resolution |
|------|-------------|------------|
| `breakout-gameplay-hires.png` | Original arcade gameplay screenshot | 640×480 approx |
| `breakout-arcade-flyer-hires.png` | Arcade cabinet flyer/marketing art | Varies |
| `breakout-atari2600-hires.png` | Atari 2600 port reference | SVG vector |

### Arkanoid (1986)
| File | Description | Resolution |
|------|-------------|------------|
| `arkanoid-gameplay.png` | Arcade gameplay screenshot | 224×256 |
| `arkanoid-arcade-flyer-hires.png` | Japanese arcade flyer | 265×375 |
| `arkanoid-concept-art.jpg` | Concept art / Vaus design | 250×72 |

---

## Original Breakout (1976) - Visual Specifications

### Screen Layout (Arcade)

```
┌─────────────────────────────────────────────────┐
│  SCORE: 000                      HI-SCORE: 0896 │  ← Top margin (10%)
├─────────────────────────────────────────────────┤
│                                                 │
│  R R R R R R R R R R R R R R R R R R R R        │  ← Row 8 (Red, 7pts)
│  R R R R R R R R R R R R R R R R R R R R        │  ← Row 7 (Red, 7pts)
│  O O O O O O O O O O O O O O O O O O O O        │  ← Row 6 (Orange, 5pts)
│  O O O O O O O O O O O O O O O O O O O O        │  ← Row 5 (Orange, 5pts)
│  G G G G G G G G G G G G G G G G G G G G        │  ← Row 4 (Green, 3pts)
│  G G G G G G G G G G G G G G G G G G G G        │  ← Row 3 (Green, 3pts)
│  Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y        │  ← Row 2 (Yellow, 1pt)
│  Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y        │  ← Row 1 (Yellow, 1pt)
│                                                 │
│                                                 │  ← Play area (60%)
│                                                 │
│                    ●                            │  ← Ball (white pixel)
│                                                 │
│                                                 │
│              ███████████                        │  ← Paddle (white)
│                                                 │
├─────────────────────────────────────────────────┤
│  BALL  CREDIT       READY                       │  ← Bottom margin (10%)
└─────────────────────────────────────────────────┘
```

### Aspect Ratio & Resolution

**Original Arcade:**
- **Monitor:** 19" diagonal B&W raster
- **Resolution:** Approximately 640×480 pixels (estimated from screenshots)
- **Orientation:** Vertical (portrait) cabinet, but game displays horizontally
- **Play field:** ~80% of screen width, ~60% of screen height

**Recommended Modern Implementation:**
- **Canvas:** 800×600 pixels (4:3 aspect ratio)
- **Play area:** 640×480 pixels (centered)
- **Margins:** 80px top/bottom for score, 40px left/right

---

## Color Palette

### Original Breakout - Cellophane Colors

The original arcade used a **B&W monitor** with colored cellophane overlays. Modern recreations use these approximate colors:

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Yellow** | `#FFFF00` | 255, 255, 0 | Rows 1-2 (bottom) |
| **Green** | `#00FF00` | 0, 255, 0 | Rows 3-4 |
| **Orange** | `#FF8800` | 255, 136, 0 | Rows 5-6 |
| **Red** | `#FF0000` | 255, 0, 0 | Rows 7-8 (top) |
| **White** | `#FFFFFF` | 255, 255, 255 | Ball, paddle, text |
| **Black** | `#000000` | 0, 0, 0 | Background |

### Arkanoid - Expanded Palette

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| White | `#FFFFFF` | 255, 255, 255 | Brick (50pts) |
| Orange | `#FFA500` | 255, 165, 0 | Brick (60pts) |
| Cyan | `#00FFFF` | 0, 255, 255 | Brick (70pts) |
| Green | `#00FF00` | 0, 255, 0 | Brick (80pts) |
| Red | `#FF0000` | 255, 0, 0 | Brick (90pts) |
| Blue | `#0000FF` | 0, 0, 255 | Brick (100pts) |
| Violet | `#8B00FF` | 139, 0, 255 | Brick (110pts) |
| Yellow | `#FFFF00` | 255, 255, 0 | Brick (120pts) |
| Silver | `#C0C0C0` | 192, 192, 192 | Multi-hit brick |
| Gold | `#FFD700` | 255, 215, 0 | Indestructible |

---

## Sprite Dimensions

### Breakout (1976) - Minimal Sprites

| Sprite | Width | Height | Notes |
|--------|-------|--------|-------|
| **Brick** | 28px | 12px | 20 bricks per row, 2px gap |
| **Ball** | 6px | 6px | White circle/square |
| **Paddle** | 100px | 12px | Shrinks to 50px after red break |
| **Text** | 8px | 12px | 7-segment style font |

**Brick Layout Math:**
```
Play width: 640px
Brick width: 28px
Gap: 2px
Bricks per row: 20

Total: (28 × 20) + (2 × 19) = 560 + 38 = 598px (centered with ~21px margins)
```

### Arkanoid (1986) - Extended Sprites

| Sprite | Width | Height | Notes |
|--------|-------|--------|-------|
| **Colored Brick** | 24px | 16px | 8 color variants |
| **Silver Brick** | 24px | 16px | Metallic texture |
| **Gold Brick** | 24px | 16px | Shiny gold texture |
| **Vaus (Normal)** | 64px | 16px | Paddle spacecraft |
| **Vaus (Laser)** | 64px | 24px | Extended with cannons |
| **Vaus (Enlarged)** | 96px | 16px | Wide paddle |
| **Ball** | 8px | 8px | Red/white sphere |
| **Capsule** | 16px | 12px | 7 color variants |
| **Enemy** | 24px | 24px | Various types |

---

## Brick Layout Data

### Breakout Screen 1 & 2 (Identical)

```javascript
// 8 rows × 20 columns
// Color mapping: 0=Yellow, 1=Green, 2=Orange, 3=Red

const brickLayout = [
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3], // Row 8 (Red)
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3], // Row 7 (Red)
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2], // Row 6 (Orange)
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2], // Row 5 (Orange)
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // Row 4 (Green)
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // Row 3 (Green)
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Row 2 (Yellow)
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Row 1 (Yellow)
];

const brickPoints = [1, 3, 5, 7]; // Index by color value
```

### Arkanoid Stage 1 Example

```javascript
// Simplified Stage 1 layout (8 rows × ~13 columns)
// 0=empty, 1-8=colored bricks, 9=silver, 10=gold

const arkanoidStage1 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,4,4,4,4,4,4,4,4,4,4,4,0], // Red bricks with gaps
  [0,4,0,0,0,4,0,0,0,4,0,4,0],
  [0,3,3,3,3,3,3,3,3,3,3,3,0], // Green bricks
  [0,3,0,0,0,3,0,0,0,3,0,3,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,0], // Orange bricks
  [0,2,0,0,0,2,0,0,0,2,0,2,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,0], // White bricks (bottom)
];
```

---

## Font Specifications

### Breakout (1976) - 7-Segment Style

```
Digit representation (8x12 pixels each):

  ┌─┐   ┌─┐   ┌─┐   ┌─┐   ┌─┐
  │ │   │ │   └─┘   └─┘   │ │
  └─┘   └─┘   ┌─┐   ┌─┐   └─┘
  │ │     │   │ │   │ │   │ │
  └─┘     │   └─┘   └─┘   │ │
  
  0       1       2       3       4
  
  ┌─┐   ┌─┐   ┌─┐   ┌─┐   ┌─┐
  │     └─┐   ┌─┐   ┌─┐   │ │
  └─┐     │   │ │   │ │   │ │
    │   ┌─┘   └─┘   │ │   └─┘
  └─┘   └─┘         └─┘
  
  5       6       7       8       9
```

**Recommended Font:** "Press Start 2P", "VT323", or custom 7-segment

### Arkanoid (1986) - Block Font

Similar to Breakout but more refined. Use pixel art font at 8×8 or 16×16.

---

## Animation Specifications

### Ball Movement

**Breakout:**
- Speed: Starts at ~3 pixels/frame
- Angle changes based on paddle hit position
- Speed increases at: 4 hits, 12 hits, orange contact, red contact

**Arkanoid:**
- Speed: Variable (Slow power-up reduces)
- Angle: Based on Vaus hit position (center=sharp, edges=shallow)
- Can have multiple balls (Disruption power-up)

### Paddle Movement

**Breakout:**
- Analog control (original arcade paddle)
- Full width: ~100px
- Shrunk width: ~50px (after breaking red row)
- Movement: Smooth, no acceleration

**Arkanoid:**
- Digital or rotary control
- Normal width: 64px
- Enlarged: 96px
- Laser mode: Adds cannons (visual only)

---

## Power-Up Capsule Design (Arkanoid)

| Color | Shape | Label | Effect |
|-------|-------|-------|--------|
| Red | Capsule | "L" | Laser |
| Blue | Capsule | "E" | Enlarge |
| Green | Capsule | "C" | Catch |
| Orange | Capsule | "S" | Slow |
| Violet | Capsule | "B" | Break |
| Cyan | Capsule | "D" | Disruption |
| Gray | Capsule | "P" | Player (extra life) |

**Capsule Dimensions:** 16×12 pixels, rounded rectangle

---

## Implementation Checklist

### Minimum Viable Breakout Clone
- [ ] Black background (#000000)
- [ ] 8 rows × 20 columns brick layout
- [ ] 4 brick colors (yellow, green, orange, red)
- [ ] White ball (6×6 pixels)
- [ ] White paddle (100×12 pixels, shrinks to 50px)
- [ ] Score display (7-segment font)
- [ ] Ball physics (bounce off walls, paddle, bricks)
- [ ] Paddle shrink after red row break
- [ ] Ball speed increases at intervals
- [ ] 2 identical screens
- [ ] 3 lives

### Full Arkanoid Clone
- [ ] All Breakout features, plus:
- [ ] 8 colored brick types (different point values)
- [ ] Silver bricks (multi-hit, progressive)
- [ ] Gold bricks (indestructible)
- [ ] Vaus paddle with transformations
- [ ] 7 power-up capsule types
- [ ] 33 unique stage layouts
- [ ] Enemy sprites
- [ ] Boss battle (Stage 33, DOH)
- [ ] Continue system
- [ ] Laser firing mechanic
- [ ] Ball catch/release mechanic

---

## Asset Creation Guide

### For Pixel Artists

1. **Start with reference images** in `vault/references/images/`
2. **Use indexed color** (8-bit palette) for authentic look
3. **No anti-aliasing** — hard pixel edges only
4. **Tile-based design** — bricks should tile seamlessly
5. **Export as PNG** with transparency where needed

### For Programmers

1. **Canvas size:** 800×600 (4:3 aspect)
2. **Play area:** 640×480 (centered)
3. **Brick grid:** 20 columns × 8 rows (Breakout) or 13×8 (Arkanoid)
4. **Frame rate:** 60 FPS
5. **Input:** Mouse/touch for paddle, or keyboard (←/→)

---

## References

- StrategyWiki Breakout: https://strategywiki.org/wiki/Breakout
- StrategyWiki Arkanoid: https://strategywiki.org/wiki/Arkanoid
- MobyGames Breakout: https://www.mobygames.com/game/7483/breakout/
- Arcade Museum: https://www.arcade-museum.com/
