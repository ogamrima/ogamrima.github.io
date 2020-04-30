class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
    this.music = true;
  }
  init(data) {}
  preload() {}
  create() {
    this.model = this.sys.game.globals.model;
    this.sound.pauseOnBlur = false;
    if (this.model.menuMusicOn && !this.model.menuMusicPlaying) {
      this.model.menuMusicPlaying = true;
      this.menuSound = this.sound.add("menu_music");
      let musicConfig = {
        mute: false,
        volume: 0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      };
      this.menuSound.play(musicConfig);
      this.sys.game.globals.menuMusic = this.menuSound;
    }

    this.add.image(400, 300, "menu_bg");
    this.add.image(400, 200, "logo");
    let playButton = this.add.image(400, 300, "play_button");
    let optionsButton = this.add
      .image(400, 400, "options_button")
      .setScale(0.75);

    playButton.setInteractive();
    optionsButton.setInteractive();

    let over = false;
    playButton.on("pointerover", () => {
      if (!over) playButton.setScale(1.25);
      over = true;
    });
    playButton.on("pointerout", () => {
      if (over) playButton.setScale(0.8);
      over = false;
    });
    playButton.on("pointerup", () => {
      this.model.menuMusicPlaying = false;
      this.sound.stopAll();
      let gameScene = this.scene.get("GamePlay");
      //this.scene.restart();
      gameScene.registry.destroy();
      gameScene.events.off();
      gameScene.scene.restart({
        timeBefore: this.time.now,
      });
      this.scene.stop();
    });

    optionsButton.on("pointerover", () => {
      if (!over) optionsButton.setScale(1.25);
      over = true;
    });
    optionsButton.on("pointerout", () => {
      if (over) optionsButton.setScale(0.8);
      over = false;
    });
    optionsButton.on("pointerup", () => {
      this.scene.launch("OptionsScene");
      this.scene.pause();
    });
    //this.scene.start("GamePlay");
  }
}
