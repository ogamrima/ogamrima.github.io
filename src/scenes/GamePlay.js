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
    this.magazine = 20;
    this.maxZombies = 24;
    this.zombiesInRound = 5; //formula: (round*0.15)*maxZombies, for rounds 1-4 the same formula*(0.2*round)
    this.zombiesSpawned = 0;
    this.zombiesKilled = 0;
    this.zombieHealth = 150;
    this.bulletsMaxSize = 30;
    this.zombieSpawnRate = 250;
    this.lastZombieSpawned = 0;
  }
  preload() {}
  create() {
    this.background = this.add.image(this.w / 2, this.h / 2, "background");
    this.player = this.physics.add
      .sprite(this.w / 2, this.h / 2, "player")
      .setScale(0.25);
    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: this.bulletsMaxSize,
      runChildUpdate: true
    });
    this.zombies = this.physics.add.group({
      classType: Zombie,
      maxSize: this.maxZombies,
      runChildUpdate: true,
    });
    this.debugger = this.add.text(
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

    //this.addZombies(this.zombiesInRound);
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
    this.input.keyboard.on('keydown', e => {
      this.player.body.velocity.normalize().scale(this.speed);
    });
    this.input.keyboard.on('keyup', e => {
      this.player.body.velocity.normalize().scale(this.speed);
    });
  }

  shoot() {

    let bullet = this.bullets.get();
    if (bullet)
      bullet.fire(this.player);

  }

  zombieQueue() {

  }

  zombieHit(bullet, zombie) {
    if (bullet.active && zombie.active) {
      bullet.piercedThrough++;
      if (bullet.piercedThrough > 2)
        bullet.destroy();
      zombie.health -= this.damage;
    }
  }

  addZombies(count) {
    for (let i = 0; i < count; i++) {
      let x, y;
      let m = Math.random();
      if (m <= 0.25) {
        x = Phaser.Math.Between(50, this.w - 50);
        y = Phaser.Math.Between(50, 200);
      } else if (m > 0.25 && m <= 0.5) {
        x = Phaser.Math.Between(50, this.w - 50);
        y = Phaser.Math.Between(this.h - 200, this.h - 50);
      } else if (m > 0.5 && m <= 0.75) {
        x = Phaser.Math.Between(50, 200);
        y = Phaser.Math.Between(50, this.h - 50);
      } else {
        x = Phaser.Math.Between(this.w - 200, this.w - 50);
        y = Phaser.Math.Between(50, this.h - 50);
      }
      let speed = Phaser.Math.Between(50, 350);
      let zombie = this.zombies.get(x, y, speed, this.zombieHealth);
      if (zombie) {
        this.zombiesSpawned++;
        zombie.activate()
      }

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
    if (time > this.lastZombieSpawned) {
      if (this.zombiesKilled >= this.zombiesInRound) {
        this.round++;
        this.zombiesSpawned = 0;
        this.zombiesKilled = 0;
        this.zombiesInRound = (this.round * 0.15) * this.maxZombies * ((this.round < 5) ? 0.2 : 1);
        this.zombieHealth = this.round < 10 ? this.zombieHealth + 100 : this.zombieHealth * 1.1;
        this.roundText.text = this.round;
      } else {
        if (this.zombiesSpawned < this.zombiesInRound) {
          this.addZombies(1);
          this.lastZombieSpawned = time + this.zombieSpawnRate;
        }

      }

    }
    this.debugger.text = this.zombies.countActive() + ", " + this.zombieHealth;
  }
}