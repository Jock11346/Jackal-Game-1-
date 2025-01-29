var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d', { willReadFrequently: true });

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
        
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Load assets
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('enemy', 'assets/enemies/enemy.png');
    this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    this.sound.add('bgMusic').play({ loop: true });
  // Load other assets as needed
}
function checkBlendModeSupport(r, i, o, a, n, s) {
  const canvas = o.create(i, 6, 1);
  const context = canvas.getContext("2d", { willReadFrequently: true });

  function checkMultiplyBlend(r, i) {
    context.globalCompositeOperation = "multiply";
    context.drawImage(r, 0, 0);
    context.drawImage(i, 2, 0);

    // Only call getImageData once
    const imageData = context.getImageData(2, 0, 1, 1);
    if (!imageData) return false;

    const data = imageData.data;
    return 255 === data[0] && 0 === data[1] && 0 === data[2];
  }

  // Load the first image
  r.onload = () => {
    // Load the second image
    i.onload = () => {
      a.supportNewBlendModes = checkMultiplyBlend(r, i);
      o.remove(i); // Clean up the temporary canvas
    };
    i.src = n + "/wCKxvRF" + s;
  };

  r.src = n + "AP804Oa6" + s;
}

// Example usage (assuming you have r, i, o, a, n, s defined):
let r = new Image();
let i = new Image();

checkBlendModeSupport(r, i, o, a, n, s);
function create() {
    // Add background
    this.add.image(400, 300, 'background');

    // Add player sprite
    this.player = this.physics.add.sprite(100, 450, 'player');

    // Player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'player', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Input events
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
    } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
    }
}

