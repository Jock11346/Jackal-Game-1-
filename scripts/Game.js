// Updated code to integrate Titan, the head of the enemy faction, into the game storyline and gameplay mechanics. Updated title to "Jackal: Rise of Raven and Titan".

// Assets list
const ASSETS = {
    background: "assets/background.png",
    titleScreen: "assets/title_screen.png",
    jackal: "assets/jackal.png",
    raven: "assets/raven.png",
    titan: "assets/titan.png", // Added Titan's sprite asset
    drone: "assets/drone.png",
    enemy: "assets/enemy.png",
    barrel: "assets/barrel.png",
    crosshair: "assets/crosshair.png",
    bullets: "assets/bullets.png",
    bossMusic: "assets/boss_music.mp3", // Added Titan's boss music
    victoryMusic: "assets/victory_music.mp3", // Victory music added
    normalMusic: "assets/normal_music.mp3"
};

// Titan character configuration
const TITAN = {
    sprite: 'titan',
    x: 400,
    y: 300,
    health: 250, // Adjusted Titan's health for balance
    damage: 15, // Adjusted damage to ensure a fair fight
    speed: 60, // Slightly increased speed for challenge
    weapon: {
        type: "plasmaHammer",
        attackRadius: 120, // Adjusted radius for balance
        damage: 10 // Added specific weapon damage
    }
};

// Game states
const STATES = {
    TITLE_SCREEN: "TITLE_SCREEN",
    GAME_PLAY: "GAME_PLAY",
    BOSS_BATTLE: "BOSS_BATTLE", // Added a new state for the Titan boss battle
    GAME_OVER: "GAME_OVER",
    VICTORY: "VICTORY"
};

let currentBossDefeated = false;

// Function to spawn Titan
function spawnTitan(scene) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const titan = scene.physics.add.sprite(TITAN.x, TITAN.y, TITAN.sprite);
    titan.health = TITAN.health;
    titan.damage = TITAN.damage;
    titan.setScale(2);

    // Titan's behaviour
    scene.physics.add.collider(titan, player, () => {
        player.health -= TITAN.damage;
        updateHUD();
        if (player.health <= 0) {
            gameOver(scene);
        }
    });

    titan.attack = () => {
        const attack = scene.physics.add.sprite(titan.x, titan.y, 'plasmaShockwave');
        attack.setCircle(TITAN.weapon.attackRadius);
        scene.physics.add.overlap(player, attack, () => {
            if (!attack.active) return; // Prevent unintended overlaps
            player.health -= TITAN.weapon.damage;
            updateHUD();
            if (player.health <= 0) {
                gameOver(scene);
            }
        });
        setTimeout(() => attack.destroy(), 2000);
    };

    scene.time.addEvent({ delay: 3000, callback: titan.attack, loop: true });

    titan.on('destroy', () => {
        currentBossDefeated = true;
        scene.sound.play('victoryMusic', { volume: 0.7 });
        transitionToVictory(scene);
    });

    return titan;
}

// Updated game flow to include Titan
function updateGameFlow(scene) {
    if (scene.state === STATES.BOSS_BATTLE && !currentBossDefeated) {
        // Ensure boss battle continues until Titan is defeated
        spawnTitan(scene);
    } else if (currentBossDefeated) {
        // Transition to victory after Titan is defeated
        scene.state = STATES.VICTORY;
        transitionToVictory(scene);
    }
}

// Boss battle initiation in storyline
function startBossBattle(scene) {
    // Cutscene before Titan appears
    const cutsceneText = [
        "Jackal: So, this is the man behind it all...",
        "Titan: Hah! Man? You overestimate me. I am a force of nature!",
        "Raven: Big words for someone about to fall.",
        "Titan: You amuse me, Raven. Let’s see how long you last!"
    ];

    let index = 0;
    const showNextLine = () => {
        if (index < cutsceneText.length) {
            displayDialog(cutsceneText[index]);
            index++;
            setTimeout(showNextLine, 3000);
        } else {
            scene.state = STATES.BOSS_BATTLE;
            updateGameFlow(scene);
        }
    };
    showNextLine();
}

// Call startBossBattle at the appropriate mission level
function checkLevelProgress(scene) {
    if (scene.level === 5) { // Example: Titan appears at level 5
        startBossBattle(scene);
    }
}

// Victory screen update
function transitionToVictory(scene) {
    scene.add.image(400, 300, 'victoryScreen');
    scene.sound.stopAll();
    scene.sound.play('victoryMusic');
    displayDialog("Congratulations! Titan has been defeated.");
    scene.input.once('pointerdown', () => {
        scene.state = STATES.TITLE_SCREEN;
        resetGame(scene);
    });
}

class MyGameScene extends Phaser.Scene {
       constructor() {
           super('MyGameScene');
       }

       preload() {
           this.load.image('victoryScreen', 'assets/victory.png');
           this.load.audio('victoryMusic', 'assets/victory_music.mp3');
           // ... load other assets
       }

       create() {
           // ... your create logic, like adding images, setting up physics, etc.

           // Example of how to call transitionToVictory from a button or event:
           this.input.once('pointerdown', () => {
               this.transitionToVictory();
           });
       }

       transitionToVictory() {
           // ... your transitionToVictory function
           this.add.image(400, 300, 'victoryScreen');
           // ...
       }
   }

   const config = {
       // Your Phaser game config
       scene: [MyGameScene]
   };

   const game = new Phaser.Game(config);
let audioContext = null;

function createAudioContext(t) {
    if (audioContext) {
        return audioContext;
    }

    const e = t.config.audio;
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

    if (AudioContextConstructor) {
      audioContext = new AudioContextConstructor();
    }

    return audioContext; // Might be null if AudioContext isn't supported
}

//  Example of how to use it with a user gesture:

// 1.  A button:
const startButton = document.getElementById('startButton'); // Replace with your button's ID
startButton.addEventListener('click', () => {
    const audioContext = createAudioContext(gameConfig); // Assuming 'gameConfig' is available

    if (audioContext) {
        // Now it's safe to use the audio context
        // ...your Phaser initialization code...
        // Example:
        const source = audioContext.createBufferSource();
        // ...configure and play the source...

    } else {
        console.error("AudioContext not supported.");
    }
});

// 2. Or any other event listener (e.g., keydown):
document.addEventListener('keydown', () => {
  const audioContext = createAudioContext(gameConfig);
  if(audioContext) {
    // ... your code
  } else {
    // ... error handling
  }
});

// ...your Phaser initialization code...
// Remove the automatic call to createAudioContext.
// Initialize Phaser only after user gesture
