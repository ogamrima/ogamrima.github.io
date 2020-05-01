class OptionsScene extends Phaser.Scene {
  constructor() {
    super({
      key: "OptionsScene",
    });
    this.menuMusic = true;
    this.gameMusic = true;
  }
  init(data) {}
  create() {
    this.model = this.sys.game.globals.model;

    this.add.image(400, 300, "menu_bg");

    let backButton = this.add.image(50, 30, "back");
    backButton.setInteractive();
    backButton.on("pointerup", () => {
      this.scene.resume("MenuScene");
      this.scene.stop();
    });

    this.menuMusicLabel = this.add.text(
      200,
      200,
      "menu music:" + (this.model.menuMusicOn ? "ON" : "OFF")
    );
    this.gameMusicLabel = this.add.text(
      200,
      300,
      "game music:" + (this.model.gameMusicOn ? "ON" : "OFF")
    );

    this.menuMusicLabel.setInteractive();
    this.gameMusicLabel.setInteractive();

    this.menuMusicLabel.on("pointerup", () => {
      this.model.menuMusicOn = !this.model.menuMusicOn;
      this.updateAudio();
    });
    this.gameMusicLabel.on("pointerup", () => {
      this.model.gameMusicOn = !this.model.gameMusicOn;
      this.updateAudio();
    });
    this.updateAudio();
  }
  updateAudio() {
    if (!this.model.menuMusicOn) {
      if (this.sys.game.globals.menuMusic)
        this.sys.game.globals.menuMusic.stop();
      this.model.menuMusicPlaying = false;
    } else {
      if (!this.model.menuMusicPlaying) {
        this.sys.game.globals.menuMusic.play();
        this.model.menuMusicPlaying = true;
      }
    }

    this.menuMusicLabel.text =
      "menu music:" + (this.model.menuMusicOn ? "ON" : "OFF");
    this.gameMusicLabel.text =
      "game music:" + (this.model.gameMusicOn ? "ON" : "OFF");
  }
}
