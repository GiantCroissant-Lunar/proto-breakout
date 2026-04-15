// Game Over Scene - shows final score and restarts
class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        const { width, height } = this.scale;
        const finalScore = this.registry.get('finalScore') || 0;

        // Game Over title
        this.add.text(width / 2, height / 2 - 60, 'GAME OVER', {
            fontFamily: 'Arial',
            fontSize: '48px',
            fontStyle: 'bold',
            color: '#e94560'
        }).setOrigin(0.5);

        // Final score
        this.add.text(width / 2, height / 2, `Final Score: ${finalScore}`, {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#f5f5f5'
        }).setOrigin(0.5);

        // Restart instruction
        const restartText = this.add.text(width / 2, height / 2 + 80, 'Click or Press Space to Restart', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#16c79a'
        }).setOrigin(0.5);

        // Pulsing animation
        this.tweens.add({
            targets: restartText,
            alpha: 0.5,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Input handling
        this.input.on('pointerup', () => this.restartGame());
        
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
