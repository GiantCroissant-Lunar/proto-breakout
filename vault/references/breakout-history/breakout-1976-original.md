# Breakout (1976) - Original Atari Arcade Game

**Release Date:** May 13, 1976  
**Developer:** Atari, Inc.  
**Designers:** Nolan Bushnell, Steve Bristow  
**Programmers:** Steve Wozniak (prototype), Gary Waters (production)  

---

## Historical Context

Breakout was conceptualized by Nolan Bushnell and Steve Bristow as a single-player variant of Pong (1972). The game was developed as an internal competition at Atari, with Steve Jobs commissioned to create a prototype (which he completed with Steve Wozniak's help in 4 days).

**Key Fact:** The original arcade cabinet used a **black and white monitor** with strips of **colored cellophane** placed over it to make the bricks appear colored!

The original Breakout was built from **discrete logic circuits** (no microprocessor), which is why it cannot be emulated in MAME—it must be simulated.

---

## Original Game Mechanics

### Brick Layout
- **8 rows** of bricks lining the top third of the screen
- **4 color bands** (2 rows each), from bottom to top:
  1. **Yellow** (bottom) - 1 point each
  2. **Green** - 3 points each
  3. **Orange** - 5 points each
  4. **Red** (top) - 7 points each

### Scoring
| Color | Points per Brick | Rows |
|-------|-----------------|------|
| Yellow | 1 | 2 rows |
| Green | 3 | 2 rows |
| Orange | 5 | 2 rows |
| Red | 7 | 2 rows |

**Maximum Score:** 896 points (448 points per screen × 2 screens)

### Gameplay Progression
- Player has **3 balls/lives** to clear **2 screens** of bricks
- **Paddle shrinks** to ½ size after ball breaks through red row and hits upper wall
- **Ball speed increases** at specific intervals:
  - After 4 hits
  - After 12 hits
  - After making contact with orange row
  - After making contact with red row

### Secret Two-Player Scoring
If Player One completes the first screen on their third ball and deliberately allows the ball to drain, Player One's second screen is transferred to Player Two as a **third screen**, allowing Player Two to score up to **1,344 points**.

---

## Technical Specifications

### Original Hardware
- **No CPU** - discrete TTL logic circuits (~100 chips in production version)
- **Wozniak's prototype:** 42 TTL chips (too compact for manufacturing)
- **Black and white raster monitor** with color overlays
- **Analog paddle controller**

### Screen Layout
```
┌─────────────────────────────────┐
│  RED    (rows 7-8) - 7 pts     │
│  RED                            │
│  ORANGE (rows 5-6) - 5 pts     │
│  ORANGE                         │
│  GREEN  (rows 3-4) - 3 pts     │
│  GREEN                          │
│  YELLOW (rows 1-2) - 1 pt      │
│  YELLOW                         │
│                                 │
│         [BALL]                  │
│                                 │
│     [PADDLE]                    │
└─────────────────────────────────┘
```

---

## Legacy

Breakout inspired:
- The **Apple II** personal computer (Jobs wanted to practice on it before designing Breakout)
- Countless **Breakout clones** throughout arcade history
- **Super Breakout** (1978) - official sequel
- **Arkanoid** (1986) - evolved the genre with power-ups
- Modern "block breaker" genre

---

## References
- Wikipedia: https://en.wikipedia.org/wiki/Breakout_(video_game)
- StrategyWiki: https://strategywiki.org/wiki/Breakout
- KLOV: https://www.arcade-museum.com/game_detail.php?game_id=7040
