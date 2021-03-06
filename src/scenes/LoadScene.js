class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadScene",
    });
  }

  preload() {
    this.load.image("menu_bg", "./assets/menu.png");
    this.load.image("logo", "./assets/logo.png");
    this.load.audio("bg", ["./assets/audio/bg.ogg", "./assets/audio/bg.mp3"]);
    this.load.audio("menu_music", "./assets/audio/menu.mp3");
    this.load.image("play_button", "./assets/play_button.png");
    this.load.image("options_button", "./assets/options_button.png");
    this.load.image("background", "./assets/level1.png");
    this.load.image("player", "./assets/character.png");
    this.load.image("bullet", "./assets/red.png");
    this.load.image("blast", "./assets/bullet.png");
    this.load.spritesheet("zombie", "./assets/zombie.png", {
      frameWidth: 288,
      frameHeight: 311,
    });
    this.load.spritesheet("explosion", "./assets/explosion.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.colors = ["blue", "green", "grey", "yellow", "orange", "pink"];
    for (let i = 0; i < this.colors.length; i++) {
      this.load.spritesheet(
        this.colors[i] + "_gem",
        "./assets/crystal-qubodup-ccby3-32-" + this.colors[i] + ".png",
        {
          frameWidth: 32,
          frameHeight: 32,
        }
      );
    }
    this.load.spritesheet("crystal_blue", "./assets/crystal_blue.png", {
      frameWidth: 63,
      frameHeight: 63,
    });
    this.load.atlas("nuke", "./assets/nuke.png", "./assets/nuke.json");
    this.load.atlas("life", "./assets/heart.png", "./assets/heart.json");
    this.load.atlas("dash", "./assets/dash.png", "./assets/dash.json");
    this.load.image("tp_bg", "./assets/supplies_background.png");
    this.load.image("red", "./assets/red.png");
    this.load.image("violet", "./assets/violet.png");
    this.load.image("light_blue", "./assets/light_blue.png");
    this.load.image("light_green", "./assets/light_green.png");
    this.load.image("back", "./assets/back.png");
    this.load.image("restart", "./assets/restart.png");
    //this.load.image("life", "./assets/life.png");
    //this.load.image("nuke", "./assets/atom.png");
    //this.load.image("dash", "./assets/flash.png");
    this.load.image("terrain", "./assets/maps/terrain.png");
    this.load.image("ex_terrain", "./assets/maps/terrain-extruded.png");
    this.load.tilemapTiledJSON("level1Map", "./assets/maps/level1.json");

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });

    /*for (let i = 0; i < 100; i++) {
      this.load.spritesheet("zombie" + i, "./assets/zombie.png", {
        frameWidth: 288,
        frameHeight: 311
      })
    }*/

    this.add.text(
      this.game.renderer.width / 2 - 20,
      this.game.renderer.height / 1.35,
      "Loading..."
    );
    this.load.on("progress", (percent) => {
      loadingBar.fillRect(
        50,
        this.game.renderer.height / 1.25,
        (this.game.renderer.width - 100) * percent,
        50
      );
    });
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
      repeat: -1,
    });
    for (let i = 0; i < this.colors.length; i++) {
      this.anims.create({
        key: this.colors[i] + "_gem_anim",
        frames: this.anims.generateFrameNumbers(this.colors[i] + "_gem"),
        frameRate: 5,
        repeat: -1,
      });
    }
    //let frameNames = this.textures.get("nuke").getFrameNames();
    this.anims.create({
      key: "nuke_anim",
      frames: this.anims.generateFrameNames("nuke"),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "life_anim",
      frames: this.anims.generateFrameNames("life"),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "dash_anim",
      frames: this.anims.generateFrameNames("dash"),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 16,
    });
    this.scene.start("MenuScene");
  }
}
