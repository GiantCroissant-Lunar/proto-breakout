class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.screen = data && data.screen !== undefined ? data.screen : 1;
        this.totalLives = data && data.totalLives !== undefined ? data.totalLives : 3;
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
            .setOrigin(0.5, 0.5)
            .setDepth(10);

        for (const segment of BREAKOUT_1976.walls.leftSegments) {
            this.add
                .rectangle(
                    segment.x,
                    segment.y,
                    segment.width,
                    segment.height,
                    colors[segment.color]
                )
                .setOrigin(0, 0)
                .setDepth(10);
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
                .setOrigin(0, 0)
                .setDepth(10);
        }

        // Add the expanded Game Over paddle stretching from left wall to right wall
        const padXX = BREAKOUT_1976.walls.leftInnerX;
        const padWidth = BREAKOUT_1976.walls.rightInnerX - BREAKOUT_1976.walls.leftInnerX;
        this.add.rectangle(
            padXX,
            BREAKOUT_1976.paddle.y,
            padWidth,
            BREAKOUT_1976.paddle.height,
            BREAKOUT_1976.colors.int.BLUE
        ).setOrigin(0, 0);

        this.leftScoreContainer = this.add.container(BREAKOUT_1976.hud.leftScoreX, BREAKOUT_1976.hud.scoreY).setDepth(20);
        this.rightScoreContainer = this.add.container(BREAKOUT_1976.hud.rightScoreX, BREAKOUT_1976.hud.scoreY).setDepth(20);
        this.leftIndicatorContainer = this.add.container(BREAKOUT_1976.hud.indicatorXLeft, BREAKOUT_1976.hud.indicatorY).setDepth(20);
        this.rightIndicatorContainer = this.add.container(BREAKOUT_1976.hud.indicatorXRight, BREAKOUT_1976.hud.indicatorY).setDepth(20);

        this.renderDigits(this.leftScoreContainer, finalScore, 3);
        this.renderDigits(this.rightScoreContainer, hiScore, 3);
        this.renderDigits(this.leftIndicatorContainer, this.screen, 1);
        this.renderDigits(this.rightIndicatorContainer, this.totalLives, 1);

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

    renderDigits(container, value, length = 3) {
        const maxVal = 10 ** length - 1;
        const digitsStr = String(Phaser.Math.Clamp(Math.floor(value), 0, maxVal)).padStart(length, '0');
        container.removeAll(true);

        const w = 14; 
        const h = 22; 
        const tX = 4; 
        const tY = 4; 
        
        const segmentDefs = {
            'A': { x: 0, y: 0, w: w, h: tY },
            'B': { x: w - tX, y: 0, w: tX, h: 11 },
            'C': { x: w - tX, y: h - 11, w: tX, h: 11 },
            'D': { x: 0, y: h - tY, w: w, h: tY },
            'E': { x: 0, y: h - 11, w: tX, h: 11 },
            'F': { x: 0, y: 0, w: tX, h: 11 },
            'G': { x: 0, y: 9, w: w, h: tY }
        };

        const segmentMap = {
            '0': ['A', 'B', 'C', 'D', 'E', 'F'],
            '1': ['B', 'C'],
            '2': ['A', 'B', 'G', 'E', 'D'],
            '3': ['A', 'B', 'G', 'C', 'D'],
            '4': ['F', 'G', 'B', 'C'],
            '5': ['A', 'F', 'G', 'C', 'D'],
            '6': ['A', 'F', 'G', 'E', 'C', 'D'],
            '7': ['A', 'B', 'C'],
            '8': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            '9': ['A', 'F', 'B', 'G', 'C', 'D']
        };

        const digitAdvance = 18;
        const color = BREAKOUT_1976.colors.int.WHITE;

        for (const [digitIndex, digit] of digitsStr.split('').entries()) {
            const offsetX = digitIndex * digitAdvance;
            const segmentsKeys = segmentMap[digit];

            for (const key of segmentsKeys) {
                const def = segmentDefs[key];
                const rect = this.add
                    .rectangle(offsetX + def.x, def.y, def.w, def.h, color)
                    .setOrigin(0, 0);
                container.add(rect);
            }
        }
    }
}
