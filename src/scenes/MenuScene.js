class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
  }
  preload() {}
  create() {
    this.add.text(400, 300, "Play", {
      font: "25px Arial",
      fill: "yellow"
    });
    this.add.text(400, 350, "Settings", {
      font: "25px Arial",
      fill: "red"
    });
    this.add.text(400, 400, "Exit", {
      font: "25px Arial",
      fill: "blue"
    });
    this.scene.start("GamePlay");
  }
}