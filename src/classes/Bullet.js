class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    let x = scene.player.x;
    let y = scene.player.y;
    super(scene, x, y, "blast");
    scene.add.existing(this);

    scene.physics.world.enableBody(this);

    scene.bullets.add(this);
    scene.physics.velocityFromRotation(
      scene.player.rotation,
      1800,
      this.body.velocity
    );
    this.setScale(0.125);

    /*Phaser.GameObjects.Image.call(this, scene, x, y, 'bullet');
    this.speed = 1;
    this.born = 0;
    this.direction = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.setSize(12, 12, true);*/
  }

  fire(player, target) {
    this.angle = player.angle + 90;
    /*this.setPosition(player.x, player.y);
    this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
    if (target.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }
    this.rotation = player.rotation;
    this.born = 0;*/
  }

  update(time, delta) {
    if (
      this.x > this.scene.w ||
      this.x < 0 ||
      this.y > this.scene.h ||
      this.y < 0
    ) {
      this.destroy();
    }
    /*this.x = this.xSpeed * delta;
    this.y = this.ySpeed * delta;
    this.born += delta;
    if (this.born > 1800) {
      this.setActive(false);
      this.setVisible(false);
    }*/
  }
}