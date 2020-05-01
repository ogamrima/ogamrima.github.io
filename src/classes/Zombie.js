class Zombie extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "zombie");
    this.play("zombie_anim", true);
    this.setScale(0.25);
    this.body.setSize(130, 130).setOffset(80, 90);
    this.name = "zombie";
    this.speedConstant = 1;

    //this.setBounce(2);
  }
  create() {}

  activate(speed, health) {
    super.activate(speed, health);
  }

  update() {
    super.update();
  }

  explode() {
    this.scene.zombieKill(this);
  }

  died() {
    //console.log(this.scene.enemiesKilled);
    this.scene.enemiesKilled++;
    //console.log(this.scene.enemiesKilled);
    this.destroy();
  }
}
