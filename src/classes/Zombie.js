class Zombie extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, speed, health) {
        super(scene, x, y, "zombie");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.play("zombie_anim", true);
        this.setScale(0.25);
        this.speed = speed;
        this.health = health;
    }

    activate() {
        this.setActive(true);
        this.setVisible(true);
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
            this.scene.zombiesKilled++;
            this.destroy();

        }
    }
}