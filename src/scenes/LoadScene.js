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
    this.colors = ["blue", "green", "grey", "yellow", "orange", "pink"];
    for (let i = 0; i < this.colors.length; i++) {
      this.load.spritesheet(this.colors[i] + "_gem", "./assets/crystal-qubodup-ccby3-32-" + this.colors[i] + ".png", {
        frameWidth: 32,
        frameHeight: 32
      });
    }
    this.load.spritesheet("crystal_blue", "./assets/crystal_blue.png", {
      frameWidth: 63,
      frameHeight: 63
    })
    this.load.image("red", "./assets/red.png");
    this.load.image("violet", "./assets/violet.png");
    this.load.image("light_blue", "./assets/light_blue.png");
    this.load.image("light_green", "./assets/light_green.png");
    this.load.image("life", "./assets/life.png");
    this.load.image("nuke", "./assets/atom.png");
    this.load.image("dash", "./assets/flash.png");

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
    this.anims.create({
      key: "crystal_blue_anim",
      frames: this.anims.generateFrameNumbers("crystal_blue"),
      frameRate: 1,
      repeat: -1
    })
    for (let i = 0; i < this.colors.length; i++) {
      this.anims.create({
        key: this.colors[i] + "_gem_anim",
        frames: this.anims.generateFrameNumbers(this.colors[i] + "_gem"),
        frameRate: 5,
        repeat: -1
      })
    }
    this.scene.start("MenuScene");
  }
}