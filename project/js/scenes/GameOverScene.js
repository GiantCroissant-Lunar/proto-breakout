class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        const finalScore = this.registry.get('finalScore') || 0;
        const hiScore = this.registry.get('hiScore') || finalScore;
        const topBorder = BREAKOUT_1976.hud.topBorder;
        const colors = BREAKOUT_1976.colors.int;
        const centerX = BREAKOUT_1976.world.width / 2;

        this.add
            .rectangle(
                centerX,
                topBorder.whiteY + topBorder.whiteHeight / 2,
                BREAKOUT_1976.world.width,
                topBorder.whiteHeight,
                colors.WHITE
            )
            .setOrigin(0.5, 0.5);

        for (const segment of BREAKOUT_1976.walls.leftSegments) {
            this.add
                .rectangle(
                    segment.x,
                    segment.y,
                    segment.width,
                    segment.height,
                    colors[segment.color]
                )
                .setOrigin(0, 0);
        }

        for (const segment of BREAKOUT_1976.walls.rightSegments) {
            this.add
                .rectangle(
                    segment.x,
                    segment.y,
                    segment.width,
                    segment.height,
                    colors[segment.color]
                )
                .setOrigin(0, 0);
        }

        for (const marker of BREAKOUT_1976.hud.markerDefs) {
            this.add
                .rectangle(marker.x, marker.y, marker.width, marker.height, colors.WHITE)
                .setOrigin(0, 0);
        }

        this.add
            .text(centerX, 170, 'GAME OVER', {
                fontFamily: 'monospace',
                fontSize: '18px',
                color: BREAKOUT_1976.colors.css.WHITE,
                fontStyle: 'bold',
            })
            .setOrigin(0.5);

        this.add
            .text(centerX, 202, `SCORE ${String(finalScore).padStart(3, '0')}`, {
                fontFamily: 'monospace',
                fontSize: '12px',
                color: BREAKOUT_1976.colors.css.WHITE,
            })
            .setOrigin(0.5);

        this.add
            .text(centerX, 220, `HI ${String(hiScore).padStart(3, '0')}`, {
                fontFamily: 'monospace',
                fontSize: '12px',
                color: BREAKOUT_1976.colors.css.WHITE,
            })
            .setOrigin(0.5);

        const restartText = this.add
            .text(centerX, 260, 'SPACE OR CLICK', {
                fontFamily: 'monospace',
                fontSize: '12px',
                color: BREAKOUT_1976.colors.css.WHITE,
            })
            .setOrigin(0.5);

        this.tweens.add({
            targets: restartText,
            alpha: 0.3,
            duration: 600,
            yoyo: true,
            repeat: -1,
        });

        this.input.on('pointerdown', () => this.restartGame());
        this.spaceKey = this.input.keyboard.addKey('SPACE');
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.restartGame();
        }
    }

    restartGame() {
        this.registry.set('finalScore', 0);
        this.scene.start('GameScene');
    }
}
