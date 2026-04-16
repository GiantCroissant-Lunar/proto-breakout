const BREAKOUT_1976 = {
    world: {
        width: 263,
        height: 379,
    },
    colors: {
        css: {
            BLACK: '#000000',
            WHITE: '#CCCCCC',
            LIGHT_GRAY: '#A3A3A3',
            DARK_GRAY: '#6F6F6F',
            MID_GRAY: '#9A9A9A',
            RED: '#A31E0A',
            ORANGE: '#C6850A',
            GREEN: '#0A8533',
            YELLOW: '#C2C229',
            BLUE: '#0A85C2',
        },
        int: {
            BLACK: 0x000000,
            WHITE: 0xcccccc,
            LIGHT_GRAY: 0xa3a3a3,
            DARK_GRAY: 0x6f6f6f,
            MID_GRAY: 0x9a9a9a,
            RED: 0xa31e0a,
            ORANGE: 0xc6850a,
            GREEN: 0x0a8533,
            YELLOW: 0xc2c229,
            BLUE: 0x0a85c2,
        },
    },
    hud: {
        topBorder: {
            whiteY: 36,
            whiteHeight: 13,
        },
        markerDefs: [
            { x: 14, y: 50, width: 4, height: 21 },
            { x: 161, y: 50, width: 4, height: 21 },
        ],
        leftScoreX: 22,
        rightScoreX: 170,
        scoreY: 75,
        digitWidth: 5,
        digitHeight: 7,
        digitAdvance: 19,
        digitPixelSize: 3,
    },
    walls: {
        leftInnerX: 4,
        rightInnerX: 258,
        topInnerY: 49,
        leftSegments: [{ x: 0, y: 0, width: 4, height: 379, color: 'WHITE' }],
        rightSegments: [
            { x: 258, y: 0, width: 4, height: 379, color: 'WHITE' },
            { x: 262, y: 0, width: 1, height: 379, color: 'DARK_GRAY' },
        ],
        paddleMarkers: [
            { x: 0, y: 332, width: 4, height: 13, color: 'BLUE' },
            { x: 258, y: 332, width: 5, height: 13, color: 'BLUE' },
        ],
    },
    paddle: {
        width: 41,
        shrunkWidth: 20,
        height: 6,
        y: 335,
        keyboardSpeed: 300,
    },
    ball: {
        size: 4,
        launchSpeedX: 60,
        launchSpeedY: 150,
        baseSpeed: 174,
        paddleBounceAngle: 0.95,
    },
    bricks: {
        xPositions: [0, 20, 39, 57, 76, 94, 112, 131, 149, 168, 186, 205, 223, 241],
        widths: [18, 17, 16, 17, 16, 16, 17, 16, 17, 16, 16, 16, 17, 22],
        height: 5,
        rowDefs: [
            { y: 100, colorKey: 'RED', points: 7 },
            { y: 107, colorKey: 'RED', points: 7 },
            { y: 113, colorKey: 'ORANGE', points: 5 },
            { y: 119, colorKey: 'ORANGE', points: 5 },
            { y: 126, colorKey: 'GREEN', points: 3 },
            { y: 132, colorKey: 'GREEN', points: 3 },
            { y: 138, colorKey: 'YELLOW', points: 1 },
            { y: 145, colorKey: 'YELLOW', points: 1 },
        ],
        palette: {
            RED: { face: 0xa31e0a, shade: 0x290803 },
            ORANGE: { face: 0xc2850a, shade: 0x302103 },
            GREEN: { face: 0x0a8533, shade: 0x03210d },
            YELLOW: { face: 0xc2c229, shade: 0x616114 },
        },
    },
    digits: {
        0: [
            1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
            1, 1, 1, 1, 1, 1,
        ],
        1: [
            0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
            0, 0, 1, 1, 1, 0,
        ],
        2: [
            1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
            0, 1, 1, 1, 1, 1,
        ],
        3: [
            1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1,
        ],
        4: [
            1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
            1, 0, 0, 0, 1, 1,
        ],
        5: [
            1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0,
            1, 1, 1, 1, 1, 1,
        ],
        6: [
            1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
            1, 1, 1, 1, 1, 1,
        ],
        7: [
            1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
            1, 0, 0, 0, 1, 1,
        ],
        8: [
            1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
            1, 1, 1, 1, 1, 1,
        ],
        9: [
            1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1,
        ],
    },
};
