class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "blast");
    this.born = 0;
    this.speed = 1500;
    this.piercedThrough = 0;

  }

  fire(player) {
    this.setActive(true);
    this.setVisible(true);
    this.setRotation(player.rotation);

    this.x = player.x + (50 * Math.cos(this.rotation));
    this.y = player.y + (50 * Math.sin(this.rotation));

    this.setVelocityX(this.speed * Math.cos(Math.PI * this.angle / 180));
    this.setVelocityY(this.speed * Math.sin(Math.PI * this.angle / 180));

    this.born = 0;
  }

  update(time, delta) {
    this.born += delta;
    if (this.born > 1500) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}