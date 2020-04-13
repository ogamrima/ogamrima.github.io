class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadScene",
    });
  }
  preload() {
    this.load.image("background", "./assets/map2.png");
    this.load.image("player", "./assets/character.png");
    this.load.image("bullet", "./assets/red.png");
    this.load.image("blast", "./assets/blast.png");
    this.load.spritesheet("zombie", "./assets/zombie.png", {
      frameWidth: 288,
      frameHeight: 311,
    });
  }
  create() {
    this.add.text(20, 20, "Loading game...");
    this.anims.create({
      key: "zombie_anim",
      frames: this.anims.generateFrameNumbers("zombie"),
      frameRate: 5,
      repeat: -1,
    });
    this.scene.start("MenuScene");
  }
}