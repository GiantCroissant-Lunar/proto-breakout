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

Serve `project/` with a static file server reachable from other devices:
```
cd project && python3 -m http.server 43000 --bind 0.0.0.0
```

Access URLs:
- Same machine: http://localhost:43000
- Other devices on the same Tailscale tailnet: http://juis-mac-mini.taild230e2.ts.net:43000

When replying in Discord or other remote/mobile chats, prefer the Tailscale URL over `localhost` because `localhost` only works on the machine running the server.

## Conventions

- All game scenes in `project/js/scenes/`
- Game config and boot in `project/js/config.js`
- Shared state via `this.registry` (not globals)
- Physics: Arcade only (no Matter)
- No external assets needed -- shapes generated via Graphics/text
