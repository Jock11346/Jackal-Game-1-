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
a.supportInverseAlpha = function() {
    var canvas = o.create(this, 2, 1);
    //set willReadFrequently to true
    var t = canvas.getContext("2d", { willReadFrequently: true });
    t.fillStyle = "rgba(10, 20, 30, 0.5)",
    t.fillRect(0, 0, 1, 1);
    var e = t.getImageData(0, 0, 1, 1);
    if (null === e)
        return !1;
    t.putImageData(e, 1, 0);
    var i = t.getImageData(1, 0, 1, 1);
    return i.data[0] === e.data[0] && i.data[1] === e.data[1] && i.data[2] === e.data[2] && i.data[3] === e.data[3]
}())
