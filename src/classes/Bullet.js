class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    //let x = scene.player.x;
    //let y = scene.player.y;
    super(scene, x, y, "blast");
    /*this.setScale(50, 50);
    this.body.width = 50; //.setScale(0.1275);
    this.body.height = 50*/ //.setScale(0.1275);
    this.born = 0;
    this.speed = 1500;

  }

  fire(player) {
    this.setRotation(player.rotation);

    this.x = player.x + (60 * Math.cos(this.rotation));
    this.y = player.y + (60 * Math.sin(this.rotation));

    this.setVelocityX(this.speed * Math.cos(Math.PI * this.angle / 180));
    this.setVelocityY(this.speed * Math.sin(Math.PI * this.angle / 180));

    this.born = 0;
  }

  update(time, delta) {
    this.born += delta;
    if (this.born > 1500) {
      this.destroy;
    }
  }
}