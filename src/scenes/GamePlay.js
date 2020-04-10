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
    }
    preload() {}
    create() {
      this.background = this.add.image(this.w / 2, this.h / 2, "background");
      this.player = this.physics.add
        .sprite(this.w / 2, this.h / 2, "player")
        .setScale(0.25);
      this.bullets = this.physics.add.group({
        classType: Bullet,
        runChildUpdate: true,
      });
      this.zombies = this.physics.add.group({
        classType: Zombie,
        runChildUpdate: true
      })
      this.txt = this.add.text(
        this.cameras.main.scrollX,
        this.cameras.main.scrollY,
        "", {
          font: "25px Arial",
          fill: "yellow",
        }
      );

      //this.player.play("player_anim", true);

      this.player.setCollideWorldBounds();
      this.physics.world.setBounds(0, 0, this.w, this.h);
      this.cameras.main.zoom = 0.5;
      this.cameras.main.startFollow(this.player, true);
      this.cameras.main.setBounds(0, 0, this.w, this.h);

      //this.input.setPollAlways();
      this.mouse = this.input.activePointer;

      this.addZombies(10);
      this.physics.add.collider(this.zombies);
      this.physics.add.collider(this.bullets, this.zombies, this.zombieHit, null, this);


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
    /*constrainVelocity(sprite, maxVelocity) {
      if (!sprite || !sprite.body) return;

      var angle, currVelocitySqr, vx, vy;
      vx = sprite.body.velocity.x;
      vy = sprite.body.velocity.y;
      currVelocitySqr = vx * vx + vy * vy;

      if (currVelocitySqr > maxVelocity * maxVelocity) {
        angle = Math.atan2(vy, vx);
        vx = Math.cos(angle) * maxVelocity;
        vy = Math.sin(angle) * maxVelocity;
        sprite.body.velocity.x = vx;
        sprite.body.velocity.y = vy;
      }
    }*/
    shoot() {
      let bullet = this.bullets.get().setActive(true).setVisible(true);
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
        this.lastFired = time + 100;
      }

      /*for (let i = 0; i < this.bullets.getChildren().length; i++) {
        this.bullets.getChildren()[i].update();
      }*/

      //this.constrainVelocity(this.player, 400);
      //this.txt.text = `${this.mouseX} ${this.mouseY} | ${this.input.activePointer.x} ${this.input.activePointer.y} | ${this.player.x} ${this.player.y} | ${this.cameras.main.scrollX} ${this.cameras.main.scrollY}`;
      this.txt.setPosition(this.cameras.main.scrollX, this.cameras.main.scrollY);
    }
  }