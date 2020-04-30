class Treasure extends PickUp {
  constructor(scene, x, y, number) {
    super(scene, x, y, scene.treasureColors[number]);
    this.number = number;
    this.setScale(0.5);
    this.value = (this.number + 1) * 50;
  }
  create() {}
  activate() {
    super.activate();
  }

  pick(multiplier) {
    this.scene.score += this.value * Math.floor(multiplier);
    this.scene.scoreLabel.text = this.scene.score;
    this.scene.multiplier += this.value / 4000;
    this.scene.multiplierChange();
    super.pick();
  }
}
