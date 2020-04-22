class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
  }
  preload() {}
  create() {
    this.add.image(400, 300, "menu_bg");
    this.add.image(400, 200, "logo");
    let playButton = this.add.image(400, 300, "play_button");
    let optionsButton = this.add.image(400, 400, "options_button").setScale(0.75);

    playButton.setInteractive();
    optionsButton.setInteractive();

    let over = false;
    playButton.on("pointerover", () => {
      if (!over)
        playButton.setScale(1.25);
      over = true;

    })
    playButton.on("pointerout", () => {
      if (over)
        playButton.setScale(0.8);
      over = false;

    })
    playButton.on("pointerup", () => {
      this.scene.start("GamePlay");
    })


    optionsButton.on("pointerover", () => {
      if (!over)
        optionsButton.setScale(1.25);
      over = true;

    })
    optionsButton.on("pointerout", () => {
      if (over)
        optionsButton.setScale(0.8);
      over = false;

    })


    //this.scene.start("GamePlay");
  }
}