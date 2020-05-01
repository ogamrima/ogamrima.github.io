/** @type{import("../typings/phaser")} */
import Model from "./classes/Model.js";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
      debug: false,
    },
  },
  scene: [LoadScene, MenuScene, OptionsScene, GamePlay, GameOverScene],
};

class Game extends Phaser.Game {
  constructor(config) {
    super(config);
    const model = new Model();
    this.globals = { model, menuMusic: null, gameMusic: null };
    this.scene.start("LoadScene");
  }
}
window.game = new Game(config);
