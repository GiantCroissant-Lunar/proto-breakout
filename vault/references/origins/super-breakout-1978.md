# Super Breakout (1978)

## Overview

- **Release:** September 1978
- **Designers:** Ed Rotberg, Ed Logg
- **Hardware:** MOS Technology 6502 CPU
- **Significance:** First Breakout game with a microprocessor (vs. discrete logic in original)

## Three Game Modes

Super Breakout introduced **game mode selection** — a major innovation over the original.

---

### Mode 1: Double Breakout

```
Top half:    O O O O O O O O O O O O O O   ← Orange (5-14 pts)
             O O O O O O O O O O O O O O
             O O O O O O O O O O O O O O
             O O O O O O O O O O O O O O
             (52 orange blocks total)

Bottom half: G G G G G G G G G G G G G G   ← Green (1-6 pts)
             G G G G G G G G G G G G G G
             G G G G G G G G G G G G G G
             G G G G G G G G G G G G G G
             (52 green blocks total)
```

- **104 blocks total** (52 orange + 52 green)
- **Two paddles:** One at top, one at bottom
- **Two balls** in play simultaneously
- **Variable point values** within each color (orange: 5-14, green: 1-6)

---

### Mode 2: Cavity Breakout

```
              O O O O O O O O O O O O O O   ← Orange (7-21 pts)
              O O O O O O O O O O O O O O
              O O O O O O O O O O O O O O
              O O O O O O O O O O O O O O
              (44 orange blocks)

              G G G G G G G G G G G G G G   ← Green (1-9 pts)
              G G G G G G G G G G G G G G
              G G G G G G G G G G G G G G
              G G G G G G G G G G G G G G
              (52 green blocks)
```

- **96 blocks total** (44 orange + 52 green)
- **One paddle** (at bottom only)
- **Three balls:** 2 trapped in wall pockets, must be freed to activate
- **Cavity mechanic:** Ball can get trapped behind brick formations

---

### Mode 3: Progressive Breakout

```
              B B B B B B B B B B B B B B   ← Blue (7 pts)
              B B B B B B B B B B B B B B
              B B B B B B B B B B B B B B
              B B B B B B B B B B B B B B
              (52 blue blocks)

              G G G G G G G G G G G G G G   ← Green (5 pts)
              G G G G G G G G G G G G G G
              G G G G G G G G G G G G G G
              G G G G G G G G G G G G G G
              (52 green blocks)
```

- **104 blocks total** (52 blue + 52 green)
- **One paddle, one ball**
- **Progressive mechanic:** Wall descends as blocks are destroyed
- New rows appear at top as bottom rows are cleared
- **Only mode with infinite scoring** (display rolls over at 10,000)

---

## Key Innovations Over Original Breakout

| Feature | Original Breakout | Super Breakout |
|---------|------------------|----------------|
| Game modes | 1 | 3 |
| Paddles | 1 | Up to 2 |
| Balls | 1 | Up to 3 |
| Scoring | Fixed per color | Variable within color |
| Brick behavior | Static | Descending wall (Progressive) |
| Hardware | Discrete logic | 6502 microprocessor |
| Max score | 896 | 10,000+ (rollover) |

## Design Lessons

1. **Mode variety:** Different layouts = replayability
2. **Multi-ball:** Increases chaos and skill ceiling
3. **Dynamic layouts:** Progressive mode introduced movement/change
4. **Variable scoring:** Not all bricks of same color are equal
5. **Microprocessor:** Enabled more complex game logic
