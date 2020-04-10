class GamePlay extends Phaser.Scene {
  constructor() {
    super({
      key: "GamePlay",
    });
    this.speed = 400;
    this.w = 3200;
    this.h = 2400;
    this.mouseX = 0;
    this.mouseY = 0;
  }

  preload() {}
  create() {
    this.background = this.add.image(this.w / 2, this.h / 2, "background");
    this.player = this.physics.add.sprite(this.w / 2, this.h / 2, "player");

    this.player.setScale(0.25).setCollideWorldBounds();
    this.physics.world.setBounds(0, 0, this.w, this.h);
    this.cameras.main.zoom = 0.5;
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setBounds(0, 0, this.w, this.h);
    this.input.setPollAlways();

    this.txt = this.add.text(
      this.cameras.main.scrollX,
      this.cameras.main.scrollY,
      "h ",
      {
        font: "25px Arial",
        fill: "yellow",
      }
    );

    this.moveKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.input.keyboard.on("keydown_W", (e) => {
      this.player.setVelocityY(-this.speed);
    });
    this.input.keyboard.on("keydown_S", (e) => {
      this.player.setVelocityY(this.speed);
    });
    this.input.keyboard.on("keydown_A", (e) => {
      this.player.setVelocityX(-this.speed);
    });
    this.input.keyboard.on("keydown_D", (e) => {
      this.player.setVelocityX(this.speed);
    });

    this.input.keyboard.on("keyup_W", (e) => {
      if (this.moveKeys["down"].isUp) {
        this.player.setVelocityY(0);
      }
    });
    this.input.keyboard.on("keyup_S", (e) => {
      if (this.moveKeys["up"].isUp) {
        this.player.setVelocityY(0);
      }
    });
    this.input.keyboard.on("keyup_A", (e) => {
      if (this.moveKeys["right"].isUp) {
        this.player.setVelocityX(0);
      }
    });
    this.input.keyboard.on("keyup_D", (e) => {
      if (this.moveKeys["left"].isUp) {
        this.player.setVelocityX(0);
      }
    });
  }

  update(time, delta) {
    this.mouseX = this.input.mousePointer.worldX;
    this.mouseY = this.input.mousePointer.worldY;
    this.player.rotation = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      this.mouseX,
      this.mouseY
    );

    this.txt.text = this.mouseX + ", " + this.mouseY;
    this.txt.setPosition(this.cameras.main.scrollX, this.cameras.main.scrollY);
  }
}
