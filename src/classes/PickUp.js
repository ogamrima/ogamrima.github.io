class PickUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
  }
  activate() {
    this.setActive(true);
    this.setVisible(true);
  }
  pick() {
    this.destroy(true);
  }
}
