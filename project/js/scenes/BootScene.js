class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    create() {
        this.createSolidTexture('black_pixel', BREAKOUT_1976.colors.int.BLACK);
        this.createSolidTexture('white_pixel', BREAKOUT_1976.colors.int.WHITE);
        this.createSolidTexture('light_gray_pixel', BREAKOUT_1976.colors.int.LIGHT_GRAY);
        this.createSolidTexture('dark_gray_pixel', BREAKOUT_1976.colors.int.DARK_GRAY);
        this.createSolidTexture('mid_gray_pixel', BREAKOUT_1976.colors.int.MID_GRAY);
        this.createSolidTexture('blue_pixel', BREAKOUT_1976.colors.int.BLUE);
        this.createSizedTexture(
            'blue_paddle',
            BREAKOUT_1976.colors.int.BLUE,
            BREAKOUT_1976.paddle.width,
            BREAKOUT_1976.paddle.height
        );
        this.createSizedTexture(
            'white_ball',
            BREAKOUT_1976.colors.int.WHITE,
            BREAKOUT_1976.ball.size,
            BREAKOUT_1976.ball.size
        );
        this.createSizedTexture(
            'blue_paddle_shrunk',
            BREAKOUT_1976.colors.int.BLUE,
            BREAKOUT_1976.paddle.shrunkWidth,
            BREAKOUT_1976.paddle.height
        );

        const uniqueWidths = [...new Set(BREAKOUT_1976.bricks.widths)];
        const patterns = [...new Set(BREAKOUT_1976.bricks.rowDefs.map((r) => r.pattern))];
        for (const colorKey of ['RED', 'ORANGE', 'GREEN', 'YELLOW']) {
            for (const width of uniqueWidths) {
                for (const pattern of patterns) {
                    this.createBrickTexture(
                        `brick_${colorKey.toLowerCase()}_${pattern}_${width}`,
                        BREAKOUT_1976.bricks.palette[colorKey],
                        width,
                        pattern
                    );
                }
            }
        }
        this.scene.start('GameScene');
    }

    createSolidTexture(key, color) {
        if (this.textures.exists(key)) {
            return;
        }

        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(color, 1);
        graphics.fillRect(0, 0, 1, 1);
        graphics.generateTexture(key, 1, 1);
        graphics.destroy();
    }

    createSizedTexture(key, color, width, height) {
        if (this.textures.exists(key)) {
            return;
        }

        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(color, 1);
        graphics.fillRect(0, 0, width, height);
        graphics.generateTexture(key, width, height);
        graphics.destroy();
    }

    createBrickTexture(key, palette, width, pattern) {
        if (this.textures.exists(key)) {
            return;
        }

        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        const h = BREAKOUT_1976.bricks.height;

        if (pattern === 'dark-top') {
            graphics.fillStyle(palette.shade, 1);
            graphics.fillRect(0, 0, width, 1);
            graphics.fillStyle(palette.face, 1);
            graphics.fillRect(0, 1, width, h - 1);
        } else if (pattern === 'dark-bottom') {
            graphics.fillStyle(palette.face, 1);
            graphics.fillRect(0, 0, width, h - 1);
            graphics.fillStyle(palette.shade, 1);
            graphics.fillRect(0, h - 1, width, 1);
        } else {
            graphics.fillStyle(palette.face, 1);
            graphics.fillRect(0, 0, width, h);
        }
        graphics.generateTexture(key, width, h);
        graphics.destroy();
    }
}
