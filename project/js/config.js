// Phaser Breakout - screenshot-locked configuration
const game = new Phaser.Game({
    type: Phaser.WEBGL,
    parent: 'game',
    width: BREAKOUT_1976.world.width,
    height: BREAKOUT_1976.world.height,
    backgroundColor: BREAKOUT_1976.colors.css.BLACK,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [BootScene, GameScene, GameOverScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    antialias: false,
    roundPixels: true,
    pixelArt: true,
});
