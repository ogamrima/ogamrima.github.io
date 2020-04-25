class Gem extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, value, key) {
    console.log(x, y, value, key);
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setScale(Phaser.Math.Between(1, 3) / 2);
    this.value = (value * 3) / 100;
    this.color = key;
  }
  activate() {
    this.setActive(true);
    this.setVisible(true);
    this.play(this.color + "_anim");
  }
}
