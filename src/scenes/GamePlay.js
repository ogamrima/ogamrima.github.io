class GamePlay extends Phaser.Scene {
  constructor() {
    super({
      key: "GamePlay",
    });
    this.playerName = "ogamrima";
    this.w = 3200;
    this.h = 2400;
    this.speed = 400;
    this.zombies = null;
    this.bullets = null;
    this.scoreballs = null;
    this.scoreballColors = ["violet", "red", "light_blue", "light_green"];
    this.lastFired = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.round = 1;
    this.lives = 3;
    this.score = 0;
    this.kills = 0;
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
    this.nameLabel = null;
    this.roundLabel = null;
    this.gameOver = false;
    this.fireRate = 50;
    this.magazine = 20;
    this.maxZombies = 24;
    this.zombiesInRound = 10;
    this.zombiesSpawned = 0;
    this.zombiesKilled = 0;
    this.zombieHealth = 150;
    this.bulletsMaxSize = 30;
    this.pierceableNumber = 3;
    this.zombieSpawnRate = 1000;
    this.lastSpawn = 0;
    this.timeBetweenRounds = 10000;
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
      runChildUpdate: true,
    });
    this.zombies = this.physics.add.group({
      classType: Zombie,
      maxSize: this.maxZombies,
      runChildUpdate: true,
    });
    this.scoreballs = this.physics.add.group({
      classType: Scoreball,
      maxSize: 20,
    });

    this.debugger = this.add
      .text(350, -250, "", {
        font: "25px Arial",
        fill: "yellow",
      })
      .setScrollFactor(0, 0);
    this.roundLabel = this.add
      .text(-350, 800, this.round, {
        font: "50px Arial",
        fill: "red",
      })
      .setScrollFactor(0, 0);
    this.styleConfig = {
      fontSize: "25px",
      fontFamily: "Tahoma",
      color: "#ffffff",
    };

    this.livesLabel = this.add
      .text(-375, -275, this.lives, this.styleConfig)
      .setScrollFactor(0, 0);
    this.atomsLabel = this.add
      .text(-300, -275, this.atomBombs, this.styleConfig)
      .setScrollFactor(0, 0);
    this.flashesLabel = this.add
      .text(-225, -275, this.flashes, this.styleConfig)
      .setScrollFactor(0, 0);
    this.scoreLabel = this.add
      .text(-150, -275, this.score, this.styleConfig)
      .setScrollFactor(0, 0);
    this.multiplierLabel = this.add
      .text(-85, -240, this.multiplier + "x", this.styleConfig)
      .setScrollFactor(0, 0);
    this.nameLabel = this.add
      .text(-375, -200, this.playerName, {
        fontSize: "22px",
        fontFamily: "Tahoma",
        color: "#ffffff",
      })
      .setAlpha(0.8)
      .setScrollFactor(0, 0);
    this.add
      .image(-340, -258, "life")
      .setScale(0.125)
      .setAlpha(0.9)
      .setScrollFactor(0, 0);
    this.add
      .image(-265, -258, "atom")
      .setScale(0.04)
      .setAlpha(0.9)
      .setScrollFactor(0, 0);
    this.add
      .image(-190, -258, "flash")
      .setScale(0.05)
      .setAlpha(0.9) /*.setTint(0x0fffff)*/
      .setScrollFactor(0, 0);
    this.multiplierBox = this.add
      .graphics({
        fillStyle: {
          color: 0x222222,
          alpha: 0.3,
        },
      })
      .setScrollFactor(0, 0);
    this.multiplierBox.fillRect(-380, -230, 280, 10);
    this.multiplierBar = this.add
      .graphics({
        fillStyle: {
          color: "#ffffff",
        },
      })
      .setScrollFactor(0, 0);

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
    this.physics.add.collider(
      this.player,
      this.zombies,
      this.playerGotHit,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.scoreballs,
      this.scoreballPick,
      null,
      this
    );
    this.game.canvas.oncontextmenu = (e) => e.preventDefault();
  }

  shoot() {
    let bullet = this.bullets.get();
    if (bullet) bullet.fire(this.player);
  }

  died(player) {
    player.disableBody(true, true);
    this.lives--;
    this.livesLabel.text = this.lives;
    if (this.lives <= 0) {
      this.scene.start("GameOverScene", {
        name: this.playerName,
        round: this.round,
        score: this.score,
        kills: this.kills,
        time: this.time.now
      });
    }
    //console.log(this.lives);
    //this.reset(player);
    this.time.addEvent({
      delay: 1000,
      callback: this.reset(player),
      callbackScope: this,
      loop: false,
    });
  }
  reset(player) {
    player.enableBody(true, this.w / 2, this.h / 2, true, true);
    player.alpha = 0.5;
    this.multiplier = 1;
    this.multiplierLabel.text = "1x";
    this.multiplierValue = 0;
    this.multiplierChange(this.multiplierBar);
    /*let tween = this.tweens.add({
      targets: this.player,
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: () => {
        player.alpha = 1;
      },
      callbackScope: this
    })*/
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        player.alpha = 1;
      },
      callbackScope: this,
      loop: false,
    });
  }
  playerGotHit() {
    if (this.player.alpha < 1) return;
    this.timesGotHit++;
    this.died(this.player);
  }

  scoreballPick(player, scoreball) {
    this.score += scoreball.value * this.multiplier;
    this.scoreLabel.text = this.score;
    scoreball.destroy(true);
  }

  zombieHit(bullet, zombie) {
    if (bullet.active && zombie.active) {
      zombie.health -= this.player.damage;
      bullet.setVisible(false);
      bullet.piercedThrough++;
      if (bullet.piercedThrough > this.pierceableNumber) bullet.destroy(true);
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
    bar.fillRect(-380, -230, 280 * this.multiplierValue, 10);
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
      let speed = Phaser.Math.Between(100, 275);
      let zombie = this.zombies.get(x, y, speed, this.zombieHealth);
      if (zombie) {
        this.zombiesSpawned++;
        zombie.activate();
      }
    }
  }

  update(time, delta) {
    this.player.setVelocity(0);
    if (this.mouse.isDown && time > this.lastFired) {
      if (!this.player.active) return;
      this.shoot();
      this.lastFired = time + this.fireRate;
    }
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

    if (time > this.lastSpawn) {
      if (this.zombiesKilled >= this.zombiesInRound) {
        this.round++;
        this.zombiesSpawned = 0;
        this.zombiesKilled = 0;
        this.zombiesInRound =
          Math.round(this.round * 0.15 * this.maxZombies) * 2;
        this.zombieHealth =
          this.round < 10 ?
          this.zombieHealth + 100 :
          Math.round(this.zombieHealth * 1.1);
        this.lastSpawn = time + this.timeBetweenRounds;
        this.scoreballs.clear(true, true);
        for (let i = 0; i < Phaser.Math.Between(1, 20); i++) {
          let scoreball = this.scoreballs.get(
            Phaser.Math.Between(400, 2800),
            Phaser.Math.Between(300, 2100),
            Phaser.Math.Between(0, 3)
          );
          if (scoreball) {
            scoreball.activate();
          }
        }
      } else {
        if (this.zombiesSpawned < this.zombiesInRound) {
          this.addZombies(1);
          this.lastSpawn = time + this.zombieSpawnRate;
        }
      }
    }
    this.player.body.velocity.normalize().scale(this.speed);
    this.debugger.text =
      this.zombies.countActive() +
      ", " +
      this.zombieHealth +
      ", " +
      this.zombiesInRound +
      ", " +
      this.timesGotHit;
  }
}