class Zombie extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "zombie");
    this.play("zombie_anim", true);
    this.setScale(0.25);
    this.body.setSize(130, 130).setOffset(80, 90);
    //this.setBounce(2);
  }

  activate(speed, health) {
    super.activate(speed, health);
  }

  update() {
    super.update();
  }

  explode() {
    this.scene.zombieKill(this);
  }
}
