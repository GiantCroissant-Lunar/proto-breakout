# Brick Types & Power-Ups Reference

Comprehensive reference for brick types, power-ups, and special blocks from Breakout-style games.

---

## Arkanoid (1986) - Brick Types

### Colored Bricks (Single-Hit)

| Color | Points | Hits to Destroy | Notes |
|-------|--------|-----------------|-------|
| White | 50 | 1 | Lowest value |
| Orange | 60 | 1 | |
| Cyan | 70 | 1 | |
| Green | 80 | 1 | |
| Red | 90 | 1 | |
| Blue | 100 | 1 | |
| Violet | 110 | 1 | |
| Yellow | 120 | 1 | Highest value |

### Special Bricks

| Type | Appearance | Hits to Destroy | Points | Notes |
|------|------------|-----------------|--------|-------|
| **Silver Brick** | Silver/metallic | 2+ (increases) | 50 × stage number | Takes 2 hits initially; +1 hit required every 8 stages |
| **Gold Brick** | Gold/metallic | **Indestructible** | N/A | Cannot be destroyed; not counted toward stage clear |

### Silver Brick Hit Progression

| Stage Range | Hits Required |
|-------------|---------------|
| Stages 1-8 | 2 hits |
| Stages 9-16 | 3 hits |
| Stages 17-24 | 4 hits |
| Stages 25-32 | 5 hits |
| Stage 33+ | 6+ hits |

**Point Calculation:** `Silver Brick Points = 50 × Stage Number`

---

## Arkanoid Power-Ups

Power-ups appear as **falling capsules** after destroying a random number of non-silver bricks. Only **one power-up at a time**. Effects last until another power-up is collected or the ball is lost.

| Capsule Color | Name | Effect | Duration |
|---------------|------|--------|----------|
| 🔴 **Red** | **Laser** | Transforms Vaus to fire twin lasers at bricks and enemies | Until lost/changed |
| 🔵 **Blue** | **Enlarge** | Extends Vaus paddle width | Until lost/changed |
| 🟢 **Green** | **Catch** | Ball sticks to Vaus; press Fire to release | Until lost/changed |
| 🟠 **Orange** | **Slow** | Slows ball velocity (cumulative with multiple) | Until lost/changed |
| 🟣 **Violet** | **Break** | Creates exit on right side; pass through for **10,000 bonus** + skip to next stage | One-time use |
| 🔷 **Cyan** | **Disruption** | Ball splits into **3 balls**; no penalty for losing first two | Until 1 ball remains |
| ⚪ **Gray** | **Player** | Extra life (1-up) | Immediate |

### Power-Up Mechanics

- **Spawn trigger:** Random number of non-silver bricks destroyed
- **Collection:** Must catch capsule with Vaus paddle
- **Disruption exception:** While multiple balls are in play (Disruption active), **no new power-ups spawn**
- **Ball velocity:** Slow power-up effect gradually wears off as ball bounces; can suddenly increase

---

## Original Breakout (1976) - Brick Types

Breakout had **no power-ups** and only **single-hit colored bricks**:

| Color | Points | Rows |
|-------|--------|------|
| Yellow | 1 | 2 (bottom) |
| Green | 3 | 2 |
| Orange | 5 | 2 |
| Red | 7 | 2 (top) |

**Mechanic:** Paddle shrinks after breaking through red row. Ball speed increases at intervals.

---

## Super Breakout (1978) - Brick Variants

### Double Breakout
- Orange blocks: 5-14 points
- Green blocks: 1-6 points

### Cavity Breakout
- Orange blocks: 7-21 points
- Green blocks: 1-9 points
- **Special:** Balls trapped in cavities must be freed

### Progressive Breakout
- Blue blocks: 7 points
- Green blocks: 5 points
- **Special:** Blocks descend toward paddle; new rows appear at top

---

## Common Breakout Clone Brick Types

Modern Breakout-style games often include these variants:

| Type | Behavior | Common In |
|------|----------|-----------|
| **Normal** | 1 hit, standard points | All games |
| **Hard/Steel** | 2-5 hits required | Arkanoid, clones |
| **Indestructible** | Cannot be destroyed | Arkanoid (gold), many clones |
| **Item Block** | Releases power-up when hit | Most modern clones |
| **Explosive** | Destroys adjacent bricks | Modern clones |
| **Rainbow** | Changes color, variable hits | Modern clones |
| **Gravity** | Falls when hit below | Puzzle Bobble influence |
| **Conveyor** | Moves horizontally | Modern clones |
| **Teleport** | Ball teleports elsewhere | Modern clones |

---

## Power-Up Categories (Genre Standard)

Most Breakout clones include power-ups from these categories:

### Paddle Modifications
- **Enlarge/Widen** - Paddle gets bigger
- **Shrink** - Paddle gets smaller (usually negative)
- **Laser/Gun** - Shoot projectiles at bricks
- **Sticky/Catch** - Ball sticks to paddle
- **Magnet** - Attracts nearby power-ups

### Ball Modifications
- **Multi-Ball** - Creates 2-4 additional balls
- **Slow/Fire** - Changes ball speed
- **Heavy** - Ball breaks through certain bricks
- **Angle** - Changes ball trajectory

### Player Benefits
- **Extra Life** - 1-up
- **Points Bonus** - Instant score
- **Stage Skip** - Advance to next level
- **Shield** - Protect paddle from losing ball

### Negative Power-Ups (Traps)
- **Shrink** - Paddle gets smaller
- **Fast** - Ball speeds up uncontrollably
- **Reverse** - Controls invert temporarily
- **Death** - Lose a life immediately

---

## Design Recommendations for Proto-Breakout

Based on classic games, consider implementing:

### Tier 1 (Essential)
- [ ] 4-8 colored brick types with different point values
- [ ] Indestructible blocks (for level design boundaries)
- [ ] Multi-hit blocks (progressive difficulty)

### Tier 2 (Classic)
- [ ] Paddle enlarge power-up
- [ ] Multi-ball power-up
- [ ] Laser power-up
- [ ] Catch/Sticky paddle power-up
- [ ] Extra life capsules

### Tier 3 (Advanced)
- [ ] Ball speed control (slow/fast)
- [ ] Stage skip/breakout exit
- [ ] Explosive bricks
- [ ] Moving/conveyor bricks
- [ ] Boss battle stage

---

## References
- Arkanoid Gameplay: https://strategywiki.org/wiki/Arkanoid/Gameplay
- Arkanoid Walkthrough: https://strategywiki.org/wiki/Arkanoid/Walkthrough
- Breakout: https://strategywiki.org/wiki/Breakout
- Super Breakout: https://strategywiki.org/wiki/Super_Breakout
