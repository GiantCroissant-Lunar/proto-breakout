// Boot Scene - generates all textures procedurally
class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    create() {
        // Generate paddle texture
        const paddleGfx = this.make.graphics({ x: 0, y: 0 });
        paddleGfx.fillStyle(0x16c79a, 1);
        paddleGfx.fillRoundedRect(0, 0, 120, 20, 6);
        paddleGfx.generateTexture('paddle', 120, 20);
        paddleGfx.destroy();

        // Generate ball texture
        const ballGfx = this.make.graphics({ x: 0, y: 0 });
        ballGfx.fillStyle(0xf5f5f5, 1);
        ballGfx.fillCircle(10, 10, 10);
        ballGfx.generateTexture('ball', 20, 20);
        ballGfx.destroy();

        // Generate brick textures (5 rows, different colors)
        const brickColors = [0xe94560, 0xff6b6b, 0xffa502, 0x2ed573, 0x1e90ff];
        brickColors.forEach((color, i) => {
            const brickGfx = this.make.graphics({ x: 0, y: 0 });
            brickGfx.fillStyle(color, 1);
            brickGfx.fillRoundedRect(0, 0, 70, 25, 4);
            brickGfx.generateTexture(`brick_${i}`, 70, 25);
            brickGfx.destroy();
        });

        // Generate heart texture for lives
        const heartGfx = this.make.graphics({ x: 0, y: 0 });
        heartGfx.fillStyle(0xe94560, 1);
        heartGfx.fillCircle(8, 8, 8);
        heartGfx.fillCircle(22, 8, 8);
        heartGfx.fillTriangle(0, 12, 15, 28, 30, 12);
        heartGfx.generateTexture('heart', 30, 28);
        heartGfx.destroy();

        // Transition to game
        this.scene.start('GameScene');
    }
}
