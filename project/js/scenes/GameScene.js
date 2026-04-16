class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.score = data && data.score !== undefined ? data.score : 0;
        this.lives = data && data.lives !== undefined ? data.lives : 3;
        this.ballLaunched = false;
        this.ballHits = 0;
        this.touchedOrange = false;
        this.touchedRed = false;
        this.paddleShrunk = false;
        this.screen = data && data.screen !== undefined ? data.screen : 1;
    }

    create() {
        this.physics.world.setBounds(
            BREAKOUT_1976.walls.leftInnerX,
            BREAKOUT_1976.walls.topInnerY,
            BREAKOUT_1976.walls.rightInnerX - BREAKOUT_1976.walls.leftInnerX,
            BREAKOUT_1976.world.height - BREAKOUT_1976.walls.topInnerY + 64
        );
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.registry.set('hiScore', Math.max(this.registry.get('hiScore') || 0, this.score));

        this.drawFrame();
        this.createHud();

        this.bricks = this.physics.add.staticGroup();
        this.createBricks();

        const paddleHalfWidth = BREAKOUT_1976.paddle.width / 2;
        this.paddle = this.physics.add.image(
            BREAKOUT_1976.world.width / 2,
            BREAKOUT_1976.paddle.y + BREAKOUT_1976.paddle.height / 2,
            'white_pixel'
        );
        this.paddle.setImmovable(true);
        this.paddle.setDisplaySize(BREAKOUT_1976.paddle.width, BREAKOUT_1976.paddle.height);
        this.paddle.body.setAllowGravity(false);
        this.paddle.body.setSize(BREAKOUT_1976.paddle.width, BREAKOUT_1976.paddle.height);
        this.paddle.body.moves = false;

        this.ball = this.physics.add.image(0, 0, 'white_pixel');
        this.ball.setDisplaySize(BREAKOUT_1976.ball.size, BREAKOUT_1976.ball.size);
        this.ball.body.setAllowGravity(false);
        this.ball.body.setSize(BREAKOUT_1976.ball.size, BREAKOUT_1976.ball.size);
        this.ball.setBounce(1, 1);
        this.ball.setCollideWorldBounds(true);
        this.ball.setData('onPaddle', true);
        this.ball.setAlpha(0);
        this.ball.setPosition(this.paddle.x, this.getBallRestingY());

        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);

        this.input.on('pointermove', (pointer) => {
            this.setPaddleCenter(pointer.x);
        });

        this.input.on('pointerdown', () => this.launchBall());

        this.spaceKey = this.input.keyboard.addKey('SPACE');
        this.cursors = this.input.keyboard.createCursorKeys();

        this.updateScoreDisplay();
        this.updateHiScoreDisplay();
    }

    update(_time, delta) {
        const moveAmount = BREAKOUT_1976.paddle.keyboardSpeed * (delta / 1000);

        if (this.cursors.left.isDown) {
            this.setPaddleCenter(this.paddle.x - moveAmount);
        } else if (this.cursors.right.isDown) {
            this.setPaddleCenter(this.paddle.x + moveAmount);
        }

        if (this.ball.getData('onPaddle')) {
            this.ball.setPosition(this.paddle.x, this.getBallRestingY());
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.launchBall();
        }

        if (this.touchedRed && !this.paddleShrunk && this.ball.body.blocked.up) {
            this.shrinkPaddle();
        }

        if (
            !this.ball.getData('onPaddle') &&
            this.ball.y > BREAKOUT_1976.world.height + BREAKOUT_1976.ball.size
        ) {
            this.loseLife();
        }
    }

    drawFrame() {
        const colors = BREAKOUT_1976.colors.int;
        const topBorder = BREAKOUT_1976.hud.topBorder;

        this.add
            .rectangle(
                BREAKOUT_1976.world.width / 2,
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

        for (const marker of BREAKOUT_1976.walls.paddleMarkers) {
            this.add
                .rectangle(marker.x, marker.y, marker.width, marker.height, colors[marker.color])
                .setOrigin(0, 0);
        }

        for (const marker of BREAKOUT_1976.hud.markerDefs) {
            this.add
                .rectangle(marker.x, marker.y, marker.width, marker.height, colors.WHITE)
                .setOrigin(0, 0);
        }
    }

    createHud() {
        this.leftScoreContainer = this.add.container(
            BREAKOUT_1976.hud.leftScoreX,
            BREAKOUT_1976.hud.scoreY
        );
        this.rightScoreContainer = this.add.container(
            BREAKOUT_1976.hud.rightScoreX,
            BREAKOUT_1976.hud.scoreY
        );
    }

    createBricks() {
        for (const rowDef of BREAKOUT_1976.bricks.rowDefs) {
            for (const [index, brickX] of BREAKOUT_1976.bricks.xPositions.entries()) {
                const brick = this.bricks.create(
                    brickX + BREAKOUT_1976.bricks.widths[index] / 2,
                    rowDef.y + BREAKOUT_1976.bricks.height / 2,
                    `brick_${rowDef.colorKey.toLowerCase()}`
                );
                brick.setDisplaySize(
                    BREAKOUT_1976.bricks.widths[index],
                    BREAKOUT_1976.bricks.height
                );
                brick.refreshBody();
                // Close horizontal gaps by expanding physics body width slightly
                brick.body.setSize(
                    BREAKOUT_1976.bricks.widths[index] + 3,
                    BREAKOUT_1976.bricks.height
                );
                brick.setData('points', rowDef.points);
                brick.setData('colorKey', rowDef.colorKey);
            }
        }

        this.brickCount = this.bricks.getChildren().length;
    }

    launchBall() {
        if (!this.ball.getData('onPaddle')) {
            return;
        }

        const direction = Math.random() > 0.5 ? 1 : -1;
        this.ball.setData('onPaddle', false);
        this.ball.setAlpha(1);
        this.ball.setVelocity(
            direction * BREAKOUT_1976.ball.launchSpeedX,
            -BREAKOUT_1976.ball.launchSpeedY
        );
        this.ensureBallSpeed();
    }

    hitPaddle(ball, paddle) {
        const hitPosition = (ball.x - paddle.x) / (paddle.displayWidth / 2);
        const currentSpeed = Math.max(this.getCurrentBallSpeed(), this.getTargetBallSpeed());
        const angle = Phaser.Math.Clamp(hitPosition, -1, 1) * BREAKOUT_1976.ball.paddleBounceAngle;

        ball.setVelocity(currentSpeed * Math.sin(angle), -Math.abs(currentSpeed * Math.cos(angle)));
    }

    hitBrick(ball, brick) {
        this.score += brick.getData('points');
        this.ballHits += 1;

        const colorKey = brick.getData('colorKey');
        if (colorKey === 'ORANGE') {
            this.touchedOrange = true;
        } else if (colorKey === 'RED') {
            this.touchedRed = true;
        }

        brick.destroy();
        this.brickCount -= 1;

        this.registry.set('hiScore', Math.max(this.registry.get('hiScore') || 0, this.score));
        this.updateScoreDisplay();
        this.updateHiScoreDisplay();
        this.ensureBallSpeed();

        if (this.brickCount <= 0) {
            this.scene.restart({
                score: this.score,
                lives: this.lives,
                screen: this.screen + 1,
            });
        }
    }

    getTargetBallSpeed() {
        let multiplier = 1;

        if (this.ballHits >= 4) {
            multiplier *= 1.15;
        }

        if (this.ballHits >= 12) {
            multiplier *= 1.15;
        }

        if (this.touchedOrange) {
            multiplier *= 1.15;
        }

        if (this.touchedRed) {
            multiplier *= 1.2;
        }

        return BREAKOUT_1976.ball.baseSpeed * multiplier;
    }

    getCurrentBallSpeed() {
        return Math.sqrt(this.ball.body.velocity.x ** 2 + this.ball.body.velocity.y ** 2);
    }

    ensureBallSpeed() {
        const speed = this.getCurrentBallSpeed();
        const targetSpeed = this.getTargetBallSpeed();

        if (speed === 0 || Math.abs(speed - targetSpeed) < 0.01) {
            return;
        }

        const scale = targetSpeed / speed;
        this.ball.setVelocity(this.ball.body.velocity.x * scale, this.ball.body.velocity.y * scale);
    }

    shrinkPaddle() {
        this.paddleShrunk = true;
        this.paddle.setDisplaySize(BREAKOUT_1976.paddle.shrunkWidth, BREAKOUT_1976.paddle.height);
        this.paddle.body.setSize(BREAKOUT_1976.paddle.shrunkWidth, BREAKOUT_1976.paddle.height);
        this.setPaddleCenter(this.paddle.x);
        if (this.ball.getData('onPaddle')) {
            this.ball.setPosition(this.paddle.x, this.getBallRestingY());
        }
    }

    loseLife() {
        this.lives -= 1;

        if (this.lives <= 0) {
            this.registry.set('finalScore', this.score);
            this.scene.start('GameOverScene');
            return;
        }

        this.resetBall();
    }

    resetBall() {
        this.ball.setData('onPaddle', true);
        this.ball.setAlpha(0);
        this.ball.setVelocity(0, 0);
        this.ball.setPosition(this.paddle.x, this.getBallRestingY());
    }

    updateScoreDisplay() {
        this.renderDigits(this.leftScoreContainer, this.score, 3);
    }

    updateHiScoreDisplay() {
        this.renderDigits(this.rightScoreContainer, this.registry.get('hiScore') || 0, 4);
    }

    renderDigits(container, value, length = 3) {
        const maxVal = 10 ** length - 1;
        const digits = String(Phaser.Math.Clamp(Math.floor(value), 0, maxVal)).padStart(
            length,
            '0'
        );
        container.removeAll(true);
        const pixelSize = BREAKOUT_1976.hud.digitPixelSize;

        for (const [digitIndex, digit] of digits.split('').entries()) {
            const pattern = BREAKOUT_1976.digits[digit];

            for (const [pixelIndex, pixel] of pattern.entries()) {
                if (!pixel) {
                    continue;
                }

                const x =
                    digitIndex * BREAKOUT_1976.hud.digitAdvance +
                    (pixelIndex % BREAKOUT_1976.hud.digitWidth) * pixelSize;
                const y = Math.floor(pixelIndex / BREAKOUT_1976.hud.digitWidth) * pixelSize;
                const shadow = this.add
                    .image(x + 1, y + 1, 'dark_gray_pixel')
                    .setOrigin(0, 0)
                    .setDisplaySize(pixelSize, pixelSize);
                const sprite = this.add
                    .image(x, y, 'light_gray_pixel')
                    .setOrigin(0, 0)
                    .setDisplaySize(pixelSize, pixelSize);
                container.add(shadow);
                container.add(sprite);
            }
        }
    }

    setPaddleCenter(targetX) {
        const halfWidth = this.paddle.displayWidth / 2;
        const minX = BREAKOUT_1976.walls.leftInnerX + halfWidth;
        const maxX = BREAKOUT_1976.walls.rightInnerX - halfWidth;
        this.paddle.x = Phaser.Math.Clamp(targetX, minX, maxX);
    }

    getBallRestingY() {
        return BREAKOUT_1976.paddle.y - BREAKOUT_1976.ball.size / 2;
    }
}
