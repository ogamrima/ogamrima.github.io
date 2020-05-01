class GamePlay extends Phaser.Scene {
  constructor() {
    super({
      key: "GamePlay",
    });
  }
  init(data) {
    this.timeBefore = data.timeBefore;
  }
  preload() {}
  create() {
    this.playerName = "ogamrima";
    this.w = 3200;
    this.h = 2400;
    this.speed = 400;
    this.mouseX = 0;
    this.mouseY = 0;

    this.zombies = null;
    this.bullets = null;
    this.treasures = null;
    this.gems = null;
    this.supplies = null;

    this.round = 1;
    this.lives = 3;
    this.nukes = 3;
    this.dashes = 3;
    this.score = 0;
    this.kills = 0;
    this.gameOver = false;
    this.multiplier = 1;
    this.weaponMultiplier = 1;
    this.multiplierBox = null;
    this.multiplierBar = null;

    this.scoreLabel = null;
    this.dashesLabel = null;
    this.nukesLabel = null;
    this.livesLabel = null;
    this.multiplierLabel = null;
    this.nameLabel = null;
    this.roundLabel = null;
    this.debugger = null;

    this.lastFired = 0;
    this.fireRate = 50;
    this.magazine = 20;
    this.zombiesInRound = 14;
    this.zombiesSpawned = 0;
    this.enemiesKilled = 0;
    this.zombieHealth = 150;
    this.pierceableNumber = 3;
    this.zombieSpawnRate = 500;
    this.lastSpawn = 0;
    this.timeBetweenRounds = 10000;
    this.timesGotHit = 0;
    //this.timeBefore = null;
    this.lavaDamage = 5;
    this.playerHealth = 100;

    this.treasureColors = ["violet", "red", "light_blue", "light_green"];
    this.gemColors = ["blue", "green", "grey", "yellow", "orange", "pink"];
    this.model = this.sys.game.globals.model;
    this.sound.pauseOnBlur = false;
    if (this.model.gameMusicOn) {
      this.model.gameMusicPlaying = true;
      this.gameSound = this.sound.add("bg");
      let musicConfig = {
        mute: false,
        volume: 0.25,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      };
      this.gameSound.play(musicConfig);
      this.sys.game.globals.gameMusic = this.gameSound;
    }

    let level1Map = this.add.tilemap("level1Map");
    let terrain = level1Map.addTilesetImage("terrain");
    let botLayer = level1Map
      .createStaticLayer("bot", [terrain], 0, 0)
      .setDepth(-1);
    let topLayer = level1Map.createStaticLayer("top", [terrain], 0, 0);

    topLayer.setCollisionByProperty({ collides: true });
    topLayer.setTileIndexCallback(
      [
        261,
        262,
        263,
        282,
        283,
        284,
        303,
        304,
        305,
        324,
        325,
        326,
        345,
        346,
        347,
      ],
      this.lavaHit,
      this
    );
    topLayer.setTileIndexCallback(
      [18, 19, 20, 39, 40, 41, 60, 61, 62, 81, 82, 83, 102, 103, 104],
      this.waterHit,
      this
    );
    /*this.background = this.add
      .image(this.w / 2, this.h / 2, "background")
      .setScale(2);*/
    this.player = new Player(this, this.w / 2, this.h / 2, "player", 200, 400);

    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 25,
      runChildUpdate: true,
    });
    this.zombies = this.physics.add.group({
      classType: Zombie,
      maxSize: 24,
      runChildUpdate: true,
    });
    this.treasures = this.physics.add.group({
      classType: Treasure,
      maxSize: 20,
    });
    this.gems = this.physics.add.group({
      classType: Gem,
      maxSize: 10,
    });
    this.supplies = this.physics.add.group({
      classType: Supply,
      maxSize: 10,
    });

    this.debugger = this.add
      .text(350, -250, "", {
        font: "25px Arial",
        fill: "red",
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
    this.nukesLabel = this.add
      .text(-300, -275, this.nukes, this.styleConfig)
      .setScrollFactor(0, 0);
    this.dashesLabel = this.add
      .text(-225, -275, this.dashes, this.styleConfig)
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
      .sprite(-340, -258, "life", "heart1.png")
      .setScale(0.125)
      .setAlpha(0.9)
      .setScrollFactor(0, 0);
    this.add
      .sprite(-265, -258, "nuke", "nuke1.png")
      .setScale(0.075)
      .setAlpha(0.9)
      .setScrollFactor(0, 0);
    this.add
      .sprite(-190, -258, "dash", "dash1.png")
      .setScale(0.2)
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

    this.physics.add.overlap(this.player, topLayer);
    this.physics.add.overlap(this.zombies, topLayer);
    this.physics.add.collider(this.player, topLayer);
    this.physics.add.collider(this.zombies, topLayer);
    this.physics.add.collider(
      this.bullets,
      topLayer,
      this.bulletHitsWall,
      null,
      this
    );
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
      this.treasures,
      this.treasurePick,
      null,
      this
    );
    this.physics.add.overlap(this.player, this.gems, this.gemPick, null, this);
    this.physics.add.overlap(
      this.player,
      this.supplies,
      this.supplyPick,
      null,
      this
    );

    this.game.canvas.oncontextmenu = (e) => e.preventDefault();
    this.input.keyboard.on("keydown-Q", (e) => {
      this.nuke();
    });
    this.input.keyboard.on("keydown-E", (e) => {
      this.dash();
    });

    /*this.input.on("pointerdown", (pointer) => {
      let tile = level1Map.getTileAt(
        level1Map.worldToTileX(pointer.x),
        level1Map.worldToTileY(pointer.y)
      );
      if (tile) {
        console.log(tile);
      }
    });*/

    /*document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        this.scene.run();
      }
      if (document.visibilityState === "hidden") {
        this.scene.pause();
      }
      console.log(document.visibilityState);
    });*/
  }

  update(time, delta) {
    if (this.player.health <= this.playerHealth) this.player.health++;
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
      if (this.enemiesKilled >= this.zombiesInRound) {
        this.round++;
        this.roundLabel.text = this.round;
        this.zombiesSpawned = 0;
        this.enemiesKilled = 0;
        this.zombiesInRound = Math.round(this.round * 0.15 * 24) * 3;
        this.zombieHealth =
          this.round < 10
            ? this.zombieHealth + 100
            : Math.round(this.zombieHealth * 1.1);
        this.lastSpawn = time + this.timeBetweenRounds;
        this.treasures.clear(true, true);
        for (let i = 0; i < Phaser.Math.Between(1, 20); i++) {
          let treasure = this.treasures.get(
            Phaser.Math.Between(400, 2800),
            Phaser.Math.Between(300, 2100),
            Phaser.Math.Between(0, 3)
          );
          if (treasure) {
            treasure.activate();
          }
        }
        for (let i = 0; i < Phaser.Math.Between(0, 5); i++) {
          let gem = this.gems.get(
            Phaser.Math.Between(800, 2400),
            Phaser.Math.Between(600, 1800),
            Phaser.Math.Between(1, 9),
            this.gemColors[Phaser.Math.Between(0, 5)] + "_gem"
          );
          if (gem) {
            gem.activate();
          }
        }
        if (Math.random() > 0.8) {
          let supply = this.supplies.get(1600, 1200, Phaser.Math.Between(0, 2));
          supply.activate();
        }
      } else {
        if (this.zombiesSpawned < this.zombiesInRound) {
          this.addZombies(Phaser.Math.Between(1, 3));
          this.lastSpawn = time + this.zombieSpawnRate;
        }
      }
    }
    this.player.body.velocity
      .normalize()
      .scale(this.speed * this.player.speedConstant);

    this.player.speedConstant = 1;
    this.debugger.text =
      this.zombies.countActive() +
      ", " +
      this.zombieHealth +
      ", " +
      this.zombiesInRound +
      ", " +
      time;
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
      this.gameOver = true;
      this.sound.stopAll();
      //this.cameras.main.fade(1000);
      this.scene.start("GameOverScene", {
        name: this.playerName,
        round: this.round,
        score: this.score,
        kills: this.kills,
        time: this.time.now - this.timeBefore,
      });
    }
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
    player.health = this.playerHealth;
    this.multiplier = 1;
    this.multiplierLabel.text = "1x";
    this.multiplierChange();
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
    this.player.health -= 10;
    if (this.player.health <= 0) this.died(this.player);
  }

  treasurePick(player, treasure) {
    treasure.pick(this.multiplier);
  }

  gemPick(player, gem) {
    gem.pick();
  }

  supplyPick(player, supply) {
    supply.pick();
  }
  bulletHitsWall(bullet, topLayer) {
    bullet.destroy(true);
  }
  lavaHit(sprite, tile) {
    //console.log(1);

    if (sprite.name == "zombie") {
      sprite.health -= this.lavaDamage;
      if (sprite.health <= 0 && !sprite.dead) {
        sprite.died();
      }
    } else if (sprite.name == "player") {
      sprite.health -= this.lavaDamage;
      if (sprite.health <= 0) {
        this.died(this.player);
      }
    }
  }

  waterHit(sprite, tile) {
    if (sprite.name == "player") {
      sprite.speedConstant = 0.5;
    } else if (sprite.name == "zombie") {
      sprite.speedConstant = 0.5;
    }
  }

  zombieHit(bullet, zombie) {
    if (bullet.active && zombie.active) {
      zombie.health -= this.player.damage;
      if (zombie.health <= 0) {
        this.zombieKill(zombie);
      }
      bullet.setVisible(false);
      bullet.piercedThrough++;
      if (bullet.piercedThrough > this.pierceableNumber) bullet.destroy(true);
    }
  }
  zombieKill(zombie) {
    this.enemiesKilled++;
    this.kills++;
    this.score += 100 * Math.floor(this.multiplier) * this.weaponMultiplier;
    this.scoreLabel.text = this.score;
    zombie.destroy();
    if (Math.random() > 0.993) {
      let life = this.supplies.get(
        Phaser.Math.Between(1200, 2000),
        Phaser.Math.Between(900, 1500),
        Phaser.Math.Between(0, 2)
      );
      if (life) {
        life.activate();
      }
    }

    if (Math.random() > 0.95) {
      for (let i = 0; i < Phaser.Math.Between(0, 5); i++) {
        let treasure = this.treasures.get(
          Phaser.Math.Between(1200, 2000),
          Phaser.Math.Between(900, 1500),
          Phaser.Math.Between(0, 3)
        );
        if (treasure) {
          treasure.activate();
        }
      }
    }
  }

  multiplierChange() {
    if (this.multiplier >= 10) {
      this.multiplier = 9.999;
    }
    let decV = (this.multiplier % 1).toFixed(4);
    let intV = Math.floor(this.multiplier);
    this.multiplierLabel.text = intV + "x";
    this.multiplierBar.clear();
    this.multiplierBar.fillStyle(0xffffff, 1);
    this.multiplierBar.fillRect(-380, -230, 280 * decV, 10);
  }

  addZombies(count) {
    for (let i = 0; i < count; i++) {
      if (this.zombiesSpawned >= this.zombiesInRound) return;
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
      let speed = Phaser.Math.Between(
        125 + this.round * 3,
        300 + this.round * 2
      );
      let zombie = this.zombies.get(x, y);
      if (zombie) {
        this.zombiesSpawned++;
        zombie.activate(speed, this.zombieHealth);
      }
    }
  }

  dash(player) {
    if (this.dashes > 0) {
      this.dashes--;
      player.dash();
    }
  }

  nuke() {
    if (this.nukes > 0) {
      this.cameras.main.shake(500);
      this.nukes--;
      this.nukesLabel.text = this.nukes;
      let l = this.zombies.getChildren().length;
      //console.log(this.zombies.getChildren().length);
      for (let i = l; i >= 0; i--) {
        if (this.zombies.getChildren()[i]) {
          let explosion = new Explosion(
            this,
            this.zombies.getChildren()[i].x,
            this.zombies.getChildren()[i].y
          );
          this.zombies.getChildren()[i].explode();
          //console.log(this.enemiesKilled);
        }
      }
      /*this.zombies.getChildren().forEach((zombie) => {
        let explosion = new Explosion(this, zombie.x, zombie.y);
        zombie.explode();
      });*/
    }
  }
}
