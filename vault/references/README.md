# Vault References Index

Breakout game research for proto-breakout design reference.

## Folder Structure

```
vault/references/
├── README.md                          ← You are here
│
├── breakout-recreation-guide.md       ⭐ COMPLETE clone spec: colors, sizes, physics, code template
├── sprite-design-specification.md     Sprite dimensions, hex colors, asset guide
├── brick-types-and-powerups.md        Consolidated brick & power-up reference
├── level-design-patterns.md           Stage layout patterns & progression design
│
├── images/                            Reference screenshots
│   ├── breakout-gameplay-hires.png    Original Breakout arcade screen
│   ├── breakout-arcade-flyer-hires.png Arcade cabinet flyer
│   ├── breakout-atari2600-hires.png   Atari 2600 port
│   ├── arkanoid-gameplay.png          Arkanoid arcade screen
│   ├── arkanoid-arcade-flyer-hires.png Arkanoid Japanese flyer
│   └── arkanoid-concept-art.jpg       Vaus concept art
│
├── breakout-history/                  Historical deep-dives
│   ├── breakout-1976-original.md      Original Breakout history & mechanics
│   ├── super-breakout-1978.md         Super Breakout 3 modes
│   └── arkanoid-1986.md              Arkanoid franchise history
│
├── origins/                           Game-by-game analysis
│   ├── atari-breakout-1976.md         Brick layout, scoring, paddle math
│   ├── super-breakout-1978.md         Mode details with ASCII layouts
│   └── breakout-successors.md         Revenge of Doh, DX-Ball 2, modern games
│
└── brick-types/                       Brick system design
    ├── arkanoid-brick-system.md       Arkanoid bricks, power-ups, JS code
    └── classic-brick-comparison.md    Cross-game comparison & taxonomy
```

## Quick Reference

### What game had all the different brick types?
**Arkanoid (1986, Taito)** — the game you're probably thinking of. It evolved Breakout with:
- 8 colored brick types (1-hit, different point values)
- Silver bricks (multi-hit, progressive difficulty)
- Gold bricks (indestructible obstacles)
- 7 power-up capsule types
- 33 unique stage layouts
- Final boss battle

### How did the original Breakout lay out bricks?
Simple **8 rows of colored bands**: 2 rows each of yellow (1pt), green (3pt), orange (5pt), red (7pt), bottom to top. Only **2 identical screens**, no power-ups, no multi-hit bricks.

### Key games in chronological order
| Year | Game | Innovation |
|------|------|-----------|
| 1976 | **Breakout** | Invented the genre (single-player Pong variant) |
| 1978 | **Super Breakout** | 3 game modes, multi-ball, descending walls |
| 1986 | **Arkanoid** | Multi-hit bricks, indestructible blocks, power-ups, 33 stages, boss |
| 1987 | **Revenge of Doh** | Regenerating bricks, moving bricks, branching paths |
| 1998 | **DX-Ball 2** | Explosive/invisible bricks, 150+ boards, custom editor |
| 2010 | **Shatter** | 3D physics, boss bricks, particle effects |
| 2022 | **Arkanoid: Eternal Battle** | Modern remake of 1986 classic |

### Brick type summary for implementation

**Must-have (Tier 1):**
- Standard colored bricks (1-hit, different point values)
- Tough bricks (2-3 hits, visual damage feedback)
- Indestructible bricks (layout obstacles)

**Nice-to-have (Tier 2):**
- Explosive bricks (destroy neighbors)
- Invisible bricks (revealed near ball)
- Power-up capsules (7 Arkanoid types)

**Advanced (Tier 3):**
- Regenerating bricks (timer-based rebuild)
- Moving bricks (slide horizontally)
- Stage-scaling difficulty (silver brick formula)
