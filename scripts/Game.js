class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    this.load.image('title_screen', 'assets/title_screen.png');
    this.load.audio('background_music', 'assets/background_music.mp3');
  }

  create() {
    this.add.image(400, 300, 'title_screen');

    const music = this.sound.add('background_music', { loop: true, volume: 0.5 });

    // Wait for user interaction to play audio
    this.input.once('pointerdown', () => {
      music.play();
      this.scene.start('MainScene');
    });

    this.add.text(300, 500, 'Click to Start', {
      fontSize: '24px',
      fill: '#fff',
    });
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('jackal', 'assets/jackal.png');
    this.load.image('raven', 'assets/raven.png');
    this.load.image('titan', 'assets/titan.png');
    this.load.image('background', 'assets/background.png');
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add.text(50, 20, 'Jackal: Rise of Raven & Titan', {
      fontSize: '28px',
      fill: '#fff',
    });

    const jackal = this.add.image(200, 300, 'jackal').setScale(0.5);
    const raven = this.add.image(400, 300, 'raven').setScale(0.5);
    const titan = this.add.image(600, 300, 'titan').setScale(0.5);

    // Example: make images interactive
    jackal.setInteractive().on('pointerdown', () => alert('Jackal is ready!'));
    raven.setInteractive().on('pointerdown', () => alert('Raven is on the move!'));
    titan.setInteractive().on('pointerdown', () => alert('Titan is unstoppable!'));
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth, // Responsive width
  height: window.innerHeight, // Responsive height
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [TitleScene, MainScene],
};

const game = new Phaser.Game(config);
