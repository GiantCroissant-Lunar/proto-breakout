# Proto-Breakout

A Breakout game built with Phaser 4.

## Project Structure

```
proto-breakout/
  .agent/skills/    -- Phaser 4 API skills for AI agents
  project/          -- Game source code (index.html, js/)
  vault/            -- Design docs, specs, notes
```

## Tech Stack

- Phaser 4.0.0 (Arcade Physics build)
- Vanilla JavaScript (ES6+)
- No build tools needed -- served directly as static files

## Phaser Reference

The Phaser 4 source is cloned at `../phaser` for reference.
The game loads `phaser-arcade-physics.min.js` via a relative path.

## Running

Serve `project/` with any static file server:
```
cd project && python3 -m http.server 3000
```
Then open http://localhost:3000

## Conventions

- All game scenes in `project/js/scenes/`
- Game config and boot in `project/js/config.js`
- Shared state via `this.registry` (not globals)
- Physics: Arcade only (no Matter)
- No external assets needed -- shapes generated via Graphics/text
