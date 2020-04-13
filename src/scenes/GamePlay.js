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
    this.lives = 3;
    this.score = 0;
    this.scoreText = null;
    this.gameOver = false;
    this.fireRate = 50;
    this.magazine = 20;
    this.maxZombies = 24;
    this.zombiesInRound = 5;
    this.zombiesSpawned = 0;
    this.zombiesKilled = 0;
    this.zombieHealth = 150;
    this.bulletsMaxSize = 30;
    this.zombieSpawnRate = 500;
    this.lastZombieSpawned = 0;
    this.timesGotHit = 0;
    this.atomBombs = 0;
    this.flashes = 0;
    this.debugger = null;

  }
  preload() {}
  create() {

    this.background = this.add.image(this.w / 2, this.h / 2, "background");
    this.player = new Player(this, this.w / 2, this.h / 2, "player", 200, 400);
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
    this.mouse = this.input.activePointer;
    this.moveKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.physics.world.setBounds(0, 0, this.w, this.h);
    this.cameras.main.zoom = 0.5;
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setBounds(0, 0, this.w, this.h);

    this.physics.add.collider(this.zombies);
    this.physics.add.collider(
      this.bullets,
      this.zombies,
      this.zombieHit,
      null,
      this
    );
    this.physics.add.collider(this.player, this.zombies, this.playerGotHit, null, this);
    this.game.canvas.oncontextmenu = (e) => e.preventDefault();
  }

  shoot() {

    let bullet = this.bullets.get();
    if (bullet)
      bullet.fire(this.player);

  }
  playerGotHit() {
    this.timesGotHit++;
  }

  zombieQueue() {

  }

  zombieHit(bullet, zombie) {
    if (bullet.active && zombie.active) {
      //bullet.piercedThrough++;
      //if (bullet.piercedThrough > 2)
      bullet.destroy(true);
      zombie.health -= this.player.damage;
    }
  }

  addZombies(count) {
    for (let i = 0; i < count; i++) {
      let x, y;
      let m = Math.random();
      if (m <= 0.25) {
        x = Phaser.Math.Between(0, this.w);
        y = Phaser.Math.Between(0, 50);
      } else if (m > 0.25 && m <= 0.5) {
        x = Phaser.Math.Between(0, this.w);
        y = Phaser.Math.Between(this.h - 50, this.h);
      } else if (m > 0.5 && m <= 0.75) {
        x = Phaser.Math.Between(0, 50);
        y = Phaser.Math.Between(0, this.h);
      } else {
        x = Phaser.Math.Between(this.w - 50, this.w);
        y = Phaser.Math.Between(0, this.h);
      }
      let speed = Phaser.Math.Between(75, 300);
      let zombie = this.zombies.get(x, y, speed, this.zombieHealth);
      if (zombie) {
        this.zombiesSpawned++;
        zombie.activate()
      }

    }
  }

  update(time, delta) {
    this.player.setVelocity(0);
    if (this.moveKeys["up"].isDown && this.moveKeys["down"].isUp) {
      this.player.setVelocityY(-this.speed);
    }
    if (this.moveKeys["down"].isDown && this.moveKeys["up"].isUp) {
      this.player.setVelocityY(this.speed);
    }
    if (this.moveKeys["left"].isDown && this.moveKeys["right"].isUp) {
      this.player.setVelocityX(-this.speed);
    }
    if (this.moveKeys["right"].isDown && this.moveKeys["left"].isUp) {
      this.player.setVelocityX(this.speed);
    }
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
        this.zombiesInRound = Math.round((this.round * 0.15) * this.maxZombies);
        this.zombieHealth = this.round < 10 ? this.zombieHealth + 100 : this.zombieHealth * 1.1;
        this.roundText.text = this.round;
        this.lastZombieSpawned = time + 5000;
      } else {
        if (this.zombiesSpawned < this.zombiesInRound) {
          this.addZombies(1);
          this.lastZombieSpawned = time + this.zombieSpawnRate;
        }

      }

    }
    this.player.body.velocity.normalize().scale(this.speed);
    this.debugger.text = this.zombies.countActive() + ", " + this.zombieHealth + ", " + this.zombiesInRound + ", " + this.timesGotHit;
  }
}