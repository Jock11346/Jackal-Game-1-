class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Preload assets
        this.load.image('background', 'assets/background.png');
        this.load.image('jackal', 'assets/jackal.png');
        this.load.image('raven', 'assets/raven.png');
        this.load.image('titan', 'assets/titan.png');
        this.load.audio('bgMusic', 'assets/background-music.mp3');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Add characters
        this.add.image(200, 300, 'jackal').setScale(0.5);
        this.add.image(400, 300, 'raven').setScale(0.5);
        this.add.image(600, 300, 'titan').setScale(0.5);

        // Play background music
        this.sound.pauseOnBlur = false; // Ensures music doesn't pause when tab is inactive
        const bgMusic = this.sound.add('bgMusic');
        bgMusic.play({ loop: true });

        // Add start button
        const startButton = this.add.text(400, 500, 'Start Game', {
            font: '24px Arial',
            fill: '#fff',
        })
            .setOrigin(0.5)
            .setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Fix for canvas-related warnings
        this.setupCanvasOptimisation();
    }

    setupCanvasOptimisation() {
        // Fix for `getImageData` and `willReadFrequently`
        let canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 1;
        canvas.willReadFrequently = true;
        let context = canvas.getContext('2d', { willReadFrequently: true });
        context.fillStyle = 'rgba(10, 20, 30, 0.5)';
        context.fillRect(0, 0, 1, 1);
        let imageData = context.getImageData(0, 0, 1, 1);

        if (!imageData) {
            console.error('Canvas optimization failed.');
        }
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.add.text(400, 300, 'Game is Running!', {
            font: '32px Arial',
            fill: '#fff',
        }).setOrigin(0.5);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MainScene, GameScene],
};

const game = new Phaser.Game(config);
