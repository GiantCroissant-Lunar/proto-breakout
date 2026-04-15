// Game Scene - main Breakout gameplay
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init() {
        // Reset state on every start/restart
        this.score = 0;
        this.lives = 3;
        this.ballLaunched = false;
        this.level = 1;
        this.brickCount = 0;
    }

    create() {
        const { width, height } = this.scale;

        // --- PADDLE ---
        this.paddle = this.physics.add.image(width / 2, height - 40, 'paddle');
        this.paddle.setImmovable(true);
        this.paddle.setCollideWorldBounds(true);

        // --- BALL ---
        this.ball = this.physics.add.image(width / 2, height - 62, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);
        this.ball.setData('onPaddle', true);

        // --- BRICKS ---
        this.bricks = this.physics.add.staticGroup();
        this.createBricks();

        // --- HUD ---
        this.scoreText = this.add.text(20, 12, 'Score: 0', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#f5f5f5'
        });

        this.levelText = this.add.text(width / 2, 12, `Level ${this.level}`, {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#f5f5f5'
        }).setOrigin(0.5, 0);

        // Lives displayed as hearts
        this.livesGroup = this.add.group();
        this.updateLivesDisplay();

        // Launch instruction
        this.launchText = this.add.text(width / 2, height / 2, 'Click or Press Space to Launch', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#16c79a'
        }).setOrigin(0.5);

        // --- COLLIDERS ---
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);

        // --- INPUT ---
        // Mouse / touch follows paddle
        this.input.on('pointermove', (pointer) => {
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 60, width - 60);

            if (this.ball.getData('onPaddle')) {
                this.ball.x = this.paddle.x;
            }
        });

        // Launch ball
        this.input.on('pointerup', () => {
            this.launchBall();
        });

        this.spaceKey = this.input.keyboard.addKey('SPACE');
        this.cursors = this.input.keyboard.createCursorKeys();

        // World bounds bottom = ball lost
        this.physics.world.setBoundsCollision(true, true, true, false);
    }

    update() {
        const { width, height } = this.scale;

        // Keyboard paddle control
        if (this.cursors.left.isDown) {
            this.paddle.setVelocityX(-500);
        } else if (this.cursors.right.isDown) {
            this.paddle.setVelocityX(500);
        } else {
            this.paddle.setVelocityX(0);
        }

        // Keep ball on paddle before launch
        if (this.ball.getData('onPaddle')) {
            this.ball.x = this.paddle.x;
        }

        // Keyboard launch
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.launchBall();
        }

        // Ball fell below screen
        if (this.ball.y > height + 20) {
            this.loseLife();
        }
    }

    // --- GAME LOGIC ---

    createBricks() {
        const { width } = this.scale;
        const brickColors = 5;
        const cols = 10;
        const brickW = 70;
        const brickH = 25;
        const padX = (width - cols * (brickW + 4)) / 2 + 2;
        const padY = 60;

        for (let row = 0; row < brickColors; row++) {
            for (let col = 0; col < cols; col++) {
                const x = padX + col * (brickW + 4) + brickW / 2;
                const y = padY + row * (brickH + 4) + brickH / 2;
                const brick = this.bricks.create(x, y, `brick_${row}`);
                brick.setData('points', (brickColors - row) * 10);
            }
        }

        this.bricks.refresh();
        this.brickCount = brickColors * cols;
    }

    launchBall() {
        if (this.ball.getData('onPaddle')) {
            this.ball.setData('onPaddle', false);
            this.ball.setVelocity(
                Phaser.Math.Between(-200, 200),
                -400 - (this.level - 1) * 20
            );
            this.launchText.setVisible(false);
        }
    }

    hitPaddle(ball, paddle) {
        // Angle ball based on where it hits the paddle
        const diff = ball.x - paddle.x;
        const norm = diff / (paddle.width / 2); // -1 to 1
        const speed = ball.body.speed;

        ball.setVelocity(
            norm * speed * 0.8,
            -Math.abs(ball.body.velocity.y)
        );
    }

    hitBrick(ball, brick) {
        // Score
        this.score += brick.getData('points') || 10;
        this.scoreText.setText('Score: ' + this.score);

        // Destroy brick
        brick.destroy();
        this.brickCount--;

        // Check win
        if (this.brickCount <= 0) {
            this.level++;
            this.ballLaunched = false;
            this.scene.restart();
        }
    }

    loseLife() {
        this.lives--;

        if (this.lives <= 0) {
            // Game over
            this.registry.set('finalScore', this.score);
            this.scene.start('GameOverScene');
            return;
        }

        // Reset ball to paddle
        this.updateLivesDisplay();
        this.resetBall();
    }

    resetBall() {
        this.ball.setData('onPaddle', true);
        this.ball.setVelocity(0, 0);
        this.ball.setPosition(this.paddle.x, this.scale.height - 62);
        this.launchText.setVisible(true);
    }

    updateLivesDisplay() {
        this.livesGroup.clear(true, true);
        for (let i = 0; i < this.lives; i++) {
            this.livesGroup.create(this.scale.width - 30 - i * 36, 22, 'heart');
        }
    }
}
