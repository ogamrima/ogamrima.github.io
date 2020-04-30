class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.speed = null;
    this.health = null;
  }

  create() {}
  activate(speed, health) {
    this.setActive(true);
    this.setVisible(true);
    this.speed = speed;
    this.health = health;
  }

  update() {
    this.rotation = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.scene.player.x,
      this.scene.player.y
    );
    this.scene.physics.velocityFromRotation(
      this.rotation,
      this.speed * this.speedConstant,
      this.body.velocity
    );
    this.speedConstant = 1;
  }
}
