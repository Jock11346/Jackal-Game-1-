// Title Scene
class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    this.load.image('title_screen', 'assets/titleScreen.png');
  }

  create() {
    this.add.image(400, 300, 'title_screen');

    // Start game on user interaction
    this.input.once('pointerdown', () => {
      this.scene.start('MainScene');
    });
  }
}

// Main Game Scene
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
    this.load.audio('background_music', 'assets/background_music.mp3');
  }

  create() {
    // Add background
    this.add.image(400, 300, 'background');

    // Add characters
    const jackal = this.add.sprite(200, 300, 'jackal').setScale(0.5);
    const raven = this.add.sprite(400, 300, 'raven').setScale(0.5);
    const titan = this.add.sprite(600, 300, 'titan').setScale(0.5);

    // Setup AudioContext
    let audioContext;
    const music = this.sound.add('background_music', { loop: true });
    document.addEventListener('pointerdown', () => {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          console.log('Audio context resumed.');
        });
      }

      if (!music.isPlaying) {
        music.play();
      }
    });

    // Display character names
    this.add.text(150, 350, 'Jackal', { fontSize: '20px', fill: '#fff' });
    this.add.text(350, 350, 'Raven', { fontSize: '20px', fill: '#fff' });
    this.add.text(550, 350, 'Titan', { fontSize: '20px', fill: '#fff' });
  }
}

// Phaser Game Configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container', // Attach to a specific div in index.html
  scene: [TitleScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
