class Supply extends PickUp {
  constructor(scene, x, y, type) {
    let types = ["life", "nuke", "dash"];
    super(scene, x, y, types[type]);
    this.type = type;
    this.key = types[type];
  }
  activate() {
    super.activate();
  }
  pick() {
    if (this.type == 0) {
      if (this.scene.lives < 9) this.scene.lives++;
      this.scene.livesLabel.text = this.scene.lives;
    } else if (this.type == 1) {
      if (this.scene.nukes < 9) this.scene.nukes++;
      this.scene.nukesLabel.text = this.scene.nukes;
    } else if (this.type == 2) {
      if (this.scene.dashes < 9) this.scene.dashes++;
      this.scene.dashesLabel.text = this.scene.dashes;
    }
    super.pick();
  }
}
