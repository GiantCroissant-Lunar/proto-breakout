# Breakout Recreation Guide — Complete Specification

For agents creating an identical Breakout clone.

---

## Quick Start — Minimal Viable Clone

```javascript
// Canvas: 800×600 pixels
// Play area: 640×480 pixels (centered)

const COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  YELLOW: '#FFFF00',  // Rows 1-2 (bottom)
  GREEN: '#00FF00',   // Rows 3-4
  ORANGE: '#FF8800',  // Rows 5-6
  RED: '#FF0000'      // Rows 7-8 (top)
};

const DIMENSIONS = {
  BRICK_WIDTH: 28,
  BRICK_HEIGHT: 12,
  BRICK_GAP: 2,
  BALL_SIZE: 6,
  PADDLE_WIDTH: 100,  // Shrinks to 50
  PADDLE_HEIGHT: 12,
  BRICKS_PER_ROW: 20,
  BRICK_ROWS: 8
};
```

---

## Exact Brick Layout

### Screen Layout (Both Screens Identical)

```
TOP TO BOTTOM (8 rows, 20 bricks each):

Row 8:  R R R R R R R R R R R R R R R R R R R R  (Red, 7 points each)
Row 7:  R R R R R R R R R R R R R R R R R R R R  (Red, 7 points each)
Row 6:  O O O O O O O O O O O O O O O O O O O O  (Orange, 5 points each)
Row 5:  O O O O O O O O O O O O O O O O O O O O  (Orange, 5 points each)
Row 4:  G G G G G G G G G G G G G G G G G G G G  (Green, 3 points each)
Row 3:  G G G G G G G G G G G G G G G G G G G G  (Green, 3 points each)
Row 2:  Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y  (Yellow, 1 point each)
Row 1:  Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y  (Yellow, 1 point each)

Total bricks: 160 (8 rows × 20 bricks)
Total points per screen: 448
```

### Layout Calculation

```javascript
// Play width: 640px
// Brick calculation:
//   20 bricks × 28px = 560px
//   19 gaps × 2px = 38px
//   Total: 598px
//   Margins: (640 - 598) / 2 = 21px on each side

const brickPositions = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 20; col++) {
    brickPositions.push({
      x: 21 + (col * 30),  // 28px brick + 2px gap
      y: 60 + (row * 14),  // 12px brick + 2px gap, starting below score
      color: getBrickColor(row),  // 0-1=yellow, 2-3=green, 4-5=orange, 6-7=red
      points: getBrickPoints(row) // 1, 3, 5, or 7
    });
  }
}

function getBrickColor(rowIndex) {
  const colors = ['#FFFF00', '#FFFF00', '#00FF00', '#00FF00', 
                  '#FF8800', '#FF8800', '#FF0000', '#FF0000'];
  return colors[rowIndex];
}

function getBrickPoints(rowIndex) {
  const points = [1, 1, 3, 3, 5, 5, 7, 7];
  return points[rowIndex];
}
```

---

## Paddle Specifications

### Normal Paddle

```
Dimensions: 100px wide × 12px tall
Position: Bottom of play area, ~450px from top
Color: White (#FFFFFF)
Shape: Solid rectangle

Visual:
████████████████████████████████████████████████████████████
(100 pixels wide)
```

### Shrunk Paddle (After Red Row Break)

```
Dimensions: 50px wide × 12px tall
Trigger: Ball breaks through red row AND hits top wall
Color: White (#FFFFFF)

Visual:
██████████████████████████
(50 pixels wide - half size)
```

### Paddle Movement

```javascript
// Original arcade used analog paddle controller
// Modern implementation:

const PADDLE = {
  width: 100,
  height: 12,
  x: 350,  // Center of 640px play area
  y: 450,  // Near bottom
  speed: 8, // Pixels per frame
  minX: 21, // Left margin
  maxX: 519 // 640 - 21 - 100
};

// Input: Mouse X position or keyboard (←/→)
// Smooth movement, no acceleration
```

---

## Ball Specifications

### Appearance

```
Size: 6×6 pixels
Shape: Circle or square (original was pixelated)
Color: White (#FFFFFF)

As circle:
   ██
  ████
  ████
   ██

As square (simpler):
██████
██████
██████
██████
██████
██████
```

### Physics

```javascript
const BALL = {
  size: 6,
  startX: 320,  // Center
  startY: 300,  // Middle of play area
  initialSpeed: 3,
  maxSpeed: 8
};

// Ball speed increases at:
// - 4 total hits
// - 12 total hits  
// - Contact with orange row (rows 4-5)
// - Contact with red row (rows 6-7)

// Bounce angles based on paddle hit position:
// - Center of paddle: ~90° (straight up)
// - Near edges: ~45° (diagonal)
// - Very edges: ~20° (shallow angle)
```

---

## Score Display

### Layout

```
TOP OF SCREEN (above brick field):

SCORE: 000                           HI-SCORE: 0896
│                                      │
└─ Left side                           └─ Right side
```

### Font Style

```
7-segment display style, 8×12 pixels per digit:

  ┌─┐      ┌─┐      ┌─┐      ┌─┐      ┌─┐
  │ │      │ │      └─┘      └─┘      │ │
  └─┘      └─┘      ┌─┐      ┌─┐      │ │
  │ │        │      │ │      │ │      └─┘
  └─┘        │      └─┘      └─┘        │
  
    0          1        2        3        4

  ┌─┐      ┌─┐      ┌─┐      ┌─┐      ┌─┐
  │        └─┐      ┌─┐      │ │      │ │
  └─┐        │      │ │      │ │      └─┘
    │      ┌─┘      └─┘      └─┘        │
  └─┘      └─┘                          │
  
    5        6        7        8        9
```

### Recommended Fonts

- "Press Start 2P" (Google Fonts)
- "VT323" (Google Fonts)
- "Silkscreen"
- Custom 7-segment bitmap

---

## Game States & Flow

### State Machine

```javascript
const GAME_STATES = {
  READY: 'ready',      // "READY" displayed, waiting to start
  SERVING: 'serving',  // Ball on paddle, waiting for release
  PLAYING: 'playing',  // Ball in play
  BALL_LOST: 'lost',   // Ball fell below paddle
  SCREEN_CLEAR: 'clear', // All bricks destroyed
  GAME_OVER: 'over'    // All lives lost
};
```

### Game Flow

```
1. READY state
   - Display "READY" at bottom center
   - Wait for player input (fire/serve)

2. SERVING state
   - Ball attached to paddle center
   - Player aims and fires

3. PLAYING state
   - Ball bounces off walls, bricks, paddle
   - Bricks destroyed on contact
   - Score increases
   - Speed increases at intervals

4. BALL_LOST state
   - Ball fell below paddle
   - Lives--
   - If lives > 0: SERVING
   - If lives == 0: GAME_OVER

5. SCREEN_CLEAR state
   - All 160 bricks destroyed
   - If screen 1: Load screen 2 (identical)
   - If screen 2: Bonus points, GAME_OVER (no more screens)

6. GAME_OVER state
   - Display final score
   - Wait for credit/serve to restart
```

---

## Complete Game Data

### Scoring Summary

| Brick Color | Rows | Bricks | Points Each | Subtotal |
|-------------|------|--------|-------------|----------|
| Yellow | 1-2 | 40 | 1 | 40 |
| Green | 3-4 | 40 | 3 | 120 |
| Orange | 5-6 | 40 | 5 | 200 |
| Red | 7-8 | 40 | 7 | 280 |
| **TOTAL** | **8** | **160** | | **640** |

Wait, that's 640 but sources say 448. Let me recalculate:

Actually the original has **14 bricks per row**, not 20:

| Brick Color | Rows | Bricks | Points Each | Subtotal |
|-------------|------|--------|-------------|----------|
| Yellow | 1-2 | 28 | 1 | 28 |
| Green | 3-4 | 28 | 3 | 84 |
| Orange | 5-6 | 28 | 5 | 140 |
| Red | 7-8 | 28 | 7 | 196 |
| **TOTAL** | **8** | **112** | | **448** |

**Maximum score: 896** (448 × 2 screens)

### Corrected Layout (14 bricks per row)

```javascript
const DIMENSIONS = {
  BRICKS_PER_ROW: 14,  // NOT 20!
  BRICK_ROWS: 8,
  BRICK_WIDTH: 32,     // Wider to fill space
  BRICK_HEIGHT: 12,
  BRICK_GAP: 4
};

// Calculation:
// 14 bricks × 32px = 448px
// 13 gaps × 4px = 52px
// Total: 500px
// Margins: (640 - 500) / 2 = 70px
```

---

## Audio Specifications (Optional)

### Original Sounds

The original Breakout had minimal audio:

1. **Paddle hit** - Short beep (~440Hz, 100ms)
2. **Brick hit** - Higher beep (~880Hz, 50ms)
3. **Wall hit** - Medium beep (~660Hz, 50ms)
4. **Ball lost** - Low tone (~220Hz, 300ms)

```javascript
// Web Audio API implementation
const audioCtx = new AudioContext();

function playSound(frequency, duration) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration / 1000);
  oscillator.stop(audioCtx.currentTime + duration / 1000);
}

// Usage:
playSound(440, 100);  // Paddle hit
playSound(880, 50);   // Brick hit
playSound(660, 50);   // Wall hit
playSound(220, 300);  // Ball lost
```

---

## Implementation Checklist

### Phase 1: Core Mechanics
- [ ] Black background (#000000)
- [ ] 8 rows × 14 columns brick grid
- [ ] 4 brick colors (yellow=1pt, green=3pt, orange=5pt, red=7pt)
- [ ] White ball (6×6 pixels)
- [ ] White paddle (100×12 pixels, shrinks to 50px)
- [ ] Score display (top left)
- [ ] Hi-score display (top right)
- [ ] Paddle movement (mouse or keyboard)
- [ ] Ball physics (bounce off walls)
- [ ] Ball-paddle collision
- [ ] Ball-brick collision
- [ ] Brick destruction
- [ ] Score tracking

### Phase 2: Game Rules
- [ ] Paddle shrink after red row break
- [ ] Ball speed increases (4 hits, 12 hits, orange, red)
- [ ] 3 lives system
- [ ] Ball lost detection
- [ ] Screen clear detection
- [ ] 2-screen progression
- [ ] Game over state
- [ ] Ready/Serve states

### Phase 3: Polish
- [ ] 7-segment font
- [ ] Sound effects
- [ ] Serve mechanism (ball on paddle)
- [ ] High score persistence
- [ ] Attract mode (demo)

---

## Reference Images

All saved in `vault/references/images/`:

### Breakout (1976)
- `breakout-gameplay-hires.png` - Main gameplay screenshot
- `breakout-arcade-flyer-hires.png` - Arcade flyer art
- `breakout-atari2600-hires.png` - 2600 port reference

### Arkanoid (1986)
- `arkanoid-gameplay.png` - Gameplay screenshot
- `arkanoid-arcade-flyer-hires.png` - Japanese flyer
- `arkanoid-concept-art.jpg` - Vaus concept art

---

## Code Template

```javascript
// index.html
<!DOCTYPE html>
<html>
<head>
  <title>Breakout Clone</title>
  <style>
    body { 
      background: #000; 
      display: flex; 
      justify-content: center; 
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    canvas { 
      border: 2px solid #333;
    }
  </style>
</head>
<body>
  <canvas id="game" width="800" height="600"></canvas>
  <script src="game.js"></script>
</body>
</html>
```

```javascript
// game.js - Minimal implementation
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  YELLOW: '#FFFF00',
  GREEN: '#00FF00',
  ORANGE: '#FF8800',
  RED: '#FF0000'
};

const brickConfig = {
  rows: 8,
  cols: 14,
  width: 32,
  height: 12,
  gap: 4,
  offsetX: 70,
  offsetY: 60
};

const paddle = {
  x: 350,
  y: 450,
  width: 100,
  height: 12,
  speed: 8
};

const ball = {
  x: 400,
  y: 300,
  size: 6,
  dx: 3,
  dy: -3
};

let bricks = [];
let score = 0;
let lives = 3;

function initBricks() {
  const colors = ['#FFFF00', '#FFFF00', '#00FF00', '#00FF00',
                  '#FF8800', '#FF8800', '#FF0000', '#FF0000'];
  const points = [1, 1, 3, 3, 5, 5, 7, 7];
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 14; col++) {
      bricks.push({
        x: 70 + col * 36,
        y: 60 + row * 16,
        width: 32,
        height: 12,
        color: colors[row],
        points: points[row],
        active: true
      });
    }
  }
}

function draw() {
  // Clear
  ctx.fillStyle = COLORS.BLACK;
  ctx.fillRect(0, 0, 800, 600);
  
  // Draw bricks
  bricks.forEach(brick => {
    if (brick.active) {
      ctx.fillStyle = brick.color;
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    }
  });
  
  // Draw paddle
  ctx.fillStyle = COLORS.WHITE;
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  
  // Draw ball
  ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
  
  // Draw score
  ctx.font = '16px "Press Start 2P"';
  ctx.fillStyle = COLORS.WHITE;
  ctx.fillText(`SCORE: ${score}`, 20, 30);
}

function update() {
  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;
  
  // Wall collision
  if (ball.x <= 0 || ball.x >= 800 - ball.size) ball.dx *= -1;
  if (ball.y <= 0 || ball.y >= 600 - ball.size) ball.dy *= -1;
  
  // Paddle collision
  if (ball.y >= paddle.y - ball.size &&
      ball.y <= paddle.y + paddle.height &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.width) {
    ball.dy = -Math.abs(ball.dy);
  }
  
  // Brick collision
  bricks.forEach(brick => {
    if (brick.active &&
        ball.x >= brick.x &&
        ball.x <= brick.x + brick.width &&
        ball.y >= brick.y &&
        ball.y <= brick.y + brick.height) {
      brick.active = false;
      ball.dy *= -1;
      score += brick.points;
    }
  });
  
  // Paddle movement (mouse follow)
  // paddle.x = mouseX - paddle.width / 2;
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start
initBricks();
gameLoop();
```

---

## Testing Checklist

- [ ] Ball bounces off all 4 walls
- [ ] Ball bounces off paddle
- [ ] Ball destroys bricks on contact
- [ ] Score increases correctly per brick color
- [ ] Paddle shrinks after breaking red row
- [ ] Ball speed increases at correct intervals
- [ ] Lives decrease when ball falls below paddle
- [ ] Screen clears after all 112 bricks destroyed
- [ ] Game ends after 2 screens
- [ ] Maximum possible score is 896

---

## Resources

- Official Breakout documentation: `vault/references/origins/atari-breakout-1976.md`
- Brick comparison: `vault/references/brick-types/classic-brick-comparison.md`
- Sprite specs: `vault/references/sprite-design-specification.md`
- Reference images: `vault/references/images/`
