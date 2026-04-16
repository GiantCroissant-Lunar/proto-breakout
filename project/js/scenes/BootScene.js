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
        this.createBrickTexture('brick_red', BREAKOUT_1976.bricks.palette.RED);
        this.createBrickTexture('brick_orange', BREAKOUT_1976.bricks.palette.ORANGE);
        this.createBrickTexture('brick_green', BREAKOUT_1976.bricks.palette.GREEN);
        this.createBrickTexture('brick_yellow', BREAKOUT_1976.bricks.palette.YELLOW);
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

    createBrickTexture(key, palette) {
        if (this.textures.exists(key)) {
            return;
        }

        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(palette.face, 1);
        graphics.fillRect(0, 0, BREAKOUT_1976.bricks.widths[0] - 1, 1);
        graphics.fillStyle(palette.shade, 1);
        graphics.fillRect(
            0,
            1,
            BREAKOUT_1976.bricks.widths[0] - 1,
            BREAKOUT_1976.bricks.height - 2
        );
        graphics.generateTexture(key, BREAKOUT_1976.bricks.widths[0], BREAKOUT_1976.bricks.height);
        graphics.destroy();
    }
}
