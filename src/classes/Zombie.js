class Zombie extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "zombie");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.play("zombie_anim", true);
        this.setScale(0.25);
        this.speed = Phaser.Math.Between(200, 350);
        this.health = 300 + scene.round * 3;
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
            this.speed,
            this.body.velocity
        );
        if (this.health < 0) {
            this.destroy();
        }
    }
}