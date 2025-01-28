// Game.js: Phaser game logic

// Title Scene
class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    this.load.image('title_screen', 'assets/title_screen.png'); // Adjusted path
  }

  create() {
    this.add.image(400, 300, 'title_screen');
    this.input.once('pointerdown', () => {
      this.scene.start('MainScene');
    });
  }
}

// Main Scene
class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    // Preload assets
    this.load.image('background', 'assets/background.png');
    this.load.image('jackal', 'assets/jackal.png');
    this.load.image('raven', 'assets/raven.png');
    this.load.image('titan', 'assets/titan.png');
    this.load.audio('background_music', 'assets/music.mp3');
  }

  create() {
    this.add.image(400, 300, 'background');

    // Adding characters
    const jackal = this.physics.add.sprite(200, 300, 'jackal');
    const raven = this.physics.add.sprite(400, 300, 'raven');
    const titan = this.physics.add.sprite(600, 300, 'titan');

    // Background music
    const music = this.sound.add('background_music', { loop: true });
    music.play();

    // Display instructions
    this.add.text(50, 50, 'Click anywhere to start the action!', { fontSize: '20px', color: '#fff' });

    // Start interaction on pointer click
    this.input.on('pointerdown', () => {
      this.add.text(200, 400, 'Action has begun!', { fontSize: '24px', color: '#ff0' });
    });
  }
}

// Game Configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [TitleScene, MainScene],
};

const game = new Phaser.Game(config);
