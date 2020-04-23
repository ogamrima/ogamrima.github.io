class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadScene",
    });
  }

  preload() {
    this.load.image("menu_bg", "./assets/menu.png");
    this.load.image("logo", "./assets/logo.png");
    this.load.image("play_button", "./assets/play_button.png");
    this.load.image("options_button", "./assets/options_button.png");
    this.load.image("background", "./assets/map2.png");
    this.load.image("player", "./assets/character.png");
    this.load.image("bullet", "./assets/red.png");
    this.load.image("blast", "./assets/blast.png");
    this.load.spritesheet("zombie", "./assets/zombie.png", {
      frameWidth: 288,
      frameHeight: 311,
    });
    this.load.image("life", "./assets/life.png");
    this.load.image("atom", "./assets/atom.png");
    this.load.image("flash", "./assets/flash.png");

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });

    /*for (let i = 0; i < 100; i++) {
      this.load.spritesheet("zombie" + i, "./assets/zombie.png", {
        frameWidth: 288,
        frameHeight: 311
      })
    }*/

    this.add.text(20, 20, "Loading game...");
    this.load.on("progress", (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    })
    /*this.load.on("complete", () => {

    })*/

  }
  create() {

    this.anims.create({
      key: "zombie_anim",
      frames: this.anims.generateFrameNumbers("zombie"),
      frameRate: 5,
      repeat: -1,
    });
    this.scene.start("MenuScene");
  }
}