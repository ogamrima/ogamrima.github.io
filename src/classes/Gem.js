class Gem extends PickUp {
  constructor(scene, x, y, value, key) {
    super(scene, x, y, key);
    this.setScale(Phaser.Math.Between(1, 3) / 2);
    this.value = (value * 3) / 100;
    this.color = key;
  }
  activate() {
    super.activate();
    this.play(this.color + "_anim");
  }
  pick() {
    this.scene.multiplier += this.value;
    this.scene.multiplierChange();
    super.pick();
  }
}
