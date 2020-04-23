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
    this.multiplier = 1;
    this.weaponMultiplier = 1;
    this.multiplierValue = 0;
    this.multiplierBox = null;
    this.multiplierBar = null;
    this.scoreLabel = null;
    this.flashesLabel = null;
    this.atomsLabel = null;
    this.livesLabel = null;
    this.multiplierLabel = null;
    this.roundLabel = null;
    this.gameOver = false;
    this.fireRate = 50;
    this.magazine = 20;
    this.maxZombies = 24;
    this.zombiesInRound = 5;
    this.zombiesSpawned = 0;
    this.zombiesKilled = 0;
    this.zombieHealth = 150;
    this.bulletsMaxSize = 30;
    this.pierceableNumber = 3;
    this.zombieSpawnRate = 1000;
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
      350, -250,
      "", {
        font: "25px Arial",
        fill: "yellow",
      }
    ).setScrollFactor(0, 0);
    this.roundLabel = this.add.text(-350, 800, this.round, {
      font: "50px Arial",
      fill: "red"
    }).setScrollFactor(0, 0);
    this.styleConfig = {
      fontSize: "25px",
      fontFamily: "Tahoma",
      color: "#ffffff"
    }
    /*this.styleConfig = {
      font: "25px Tahoma",
      fill: "white"
    }*/

    this.livesLabel = this.add.text(-375, -275, this.lives, this.styleConfig).setScrollFactor(0, 0);
    this.atomsLabel = this.add.text(-300, -275, this.atomBombs, this.styleConfig).setScrollFactor(0, 0);
    this.flashesLabel = this.add.text(-225, -275, this.flashes, this.styleConfig).setScrollFactor(0, 0);
    this.scoreLabel = this.add.text(-150, -275, this.score, this.styleConfig).setScrollFactor(0, 0);
    this.multiplierLabel = this.add.text(-85, -210, this.multiplier + "x", this.styleConfig).setScrollFactor(0, 0);
    this.add.image(-340, -258, "life").setScale(0.125).setAlpha(0.9).setScrollFactor(0, 0);
    this.add.image(-265, -258, "atom").setScale(0.04).setAlpha(0.9).setScrollFactor(0, 0);
    this.add.image(-190, -258, "flash").setScale(0.05).setAlpha(0.9) /*.setTint(0x0fffff)*/ .setScrollFactor(0, 0);
    this.multiplierBox = this.add.graphics({
      fillStyle: {
        color: 0x222222,
        alpha: 0.3
      }
    }).setScrollFactor(0, 0);
    this.multiplierBox.fillRect(-380, -200, 280, 10);
    this.multiplierBar = this.add.graphics({
      fillStyle: {
        color: "#ffffff"
      }
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
      zombie.health -= this.player.damage;
      bullet.setVisible(false);
      bullet.piercedThrough++;
      if (bullet.piercedThrough > this.pierceableNumber)
        bullet.destroy(true);
    }
  }

  multiplierChange(bar) {
    if (this.multiplierValue > 1) {
      this.multiplier++;
      this.multiplierLabel.text = this.multiplier + "x";
      this.multiplierValue = this.multiplierValue - 1;
    }
    bar.clear();
    bar.fillStyle(0xffffff, 1);
    bar.fillRect(-380, -200, 280 * this.multiplierValue, 10);
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
        this.zombieHealth = this.round < 10 ? this.zombieHealth + 100 : Math.round(this.zombieHealth * 1.1);
        this.roundLabel.text = this.round;
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