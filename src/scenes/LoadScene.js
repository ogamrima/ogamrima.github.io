class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadScene",
    });
  }
  preload() {
    this.load.image("background", "./assets/map2.png");
    this.load.image("player", "./assets/player.png");

  }
  create() {

    this.scene.start("MenuScene");
  }
}