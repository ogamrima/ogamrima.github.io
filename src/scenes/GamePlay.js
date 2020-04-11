class GamePlay extends Phaser.Scene {
  constructor() {
    super({
      key: "GamePlay",
    });
    this.w = 3200;
    this.h = 2400;
    this.speed = 400;
    this.zombies = null;
    this.bullets = null;
    this.lastFired = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.round = 1;
    this.damage = 100;
    this.gameOver = false;
    this.fireRate = 50;
    this.magazine = 10;
  }
  preload() {}
  create() {
    this.background = this.add.image(this.w / 2, this.h / 2, "background");
    this.player = this.physics.add
      .sprite(this.w / 2, this.h / 2, "player")
      .setScale(0.25);
    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: this.magazine,
      runChildUpdate: true
    });
    this.zombies = this.physics.add.group({
      classType: Zombie,
      runChildUpdate: true,
    });
    this.txt = this.add.text(
      -350, -250,
      "", {
        font: "25px Arial",
        fill: "yellow",
      }
    ).setScrollFactor(0, 0);

    this.roundText = this.add.text(-350, 800, this.round, {
      font: "50px Arial",
      fill: "red"
    }).setScrollFactor(0, 0);

    //this.player.play("player_anim", true);

    this.player.setCollideWorldBounds();
    this.physics.world.setBounds(0, 0, this.w, this.h);
    this.cameras.main.zoom = 0.5;
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setBounds(0, 0, this.w, this.h);

    //this.input.setPollAlways();
    this.mouse = this.input.activePointer;

    this.addZombies(30);
    this.physics.add.collider(this.zombies);
    this.physics.add.collider(
      this.bullets,
      this.zombies,
      this.zombieHit,
      null,
      this
    );


    this.moveKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.input.keyboard.on("keydown_W", (e) => {
      //if (this.moveKeys["down"].isUp)
      this.player.setVelocityY(-this.speed);
    });
    this.input.keyboard.on("keydown_S", (e) => {
      //if (this.moveKeys["up"].isUp)
      this.player.setVelocityY(this.speed);
    });
    this.input.keyboard.on("keydown_A", (e) => {
      //if (this.moveKeys["right"].isUp)
      this.player.setVelocityX(-this.speed);
    });
    this.input.keyboard.on("keydown_D", (e) => {
      //if (this.moveKeys["left"].isUp)
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
    this.game.canvas.oncontextmenu = (e) => e.preventDefault();
  }

  shoot() {
    let bullet = this.bullets.get();
    if (bullet)
      bullet.fire(this.player);
  }

  zombieHit(bullet, zombie) {
    if (bullet.active && zombie.active) {
      bullet.destroy();
      zombie.health -= this.damage;
    }
  }

  addZombies(count) {
    for (let i = 0; i < count; i++) {
      this.zombies.get().setActive(true).setVisible(true);
    }
  }

  update(time, delta) {
    this.input.activePointer.updateWorldPoint(this.cameras.main);
    this.mouseX = this.input.activePointer.worldX;
    this.mouseY = this.input.activePointer.worldY;
    this.player.rotation = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      this.mouseX,
      this.mouseY
    );

    if (this.mouse.isDown && time > this.lastFired) {
      if (this.player.active == false) return;
      this.shoot();
      this.lastFired = time + this.fireRate;
    }
    this.player.body.velocity.normalize().scale(this.speed);
    this.txt.text = this.player.body.speed;
  }
}