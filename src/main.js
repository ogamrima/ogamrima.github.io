/** @type{import("../typings/phaser")} */

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [LoadScene, MenuScene, GamePlay],
};

let game = new Phaser.Game(config);
