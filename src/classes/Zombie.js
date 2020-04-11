class Zombie extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        let x, y;
        let m = Math.random();
        if (m <= 0.25) {
            x = Phaser.Math.Between(50, scene.w - 50);
            y = Phaser.Math.Between(50, 200);
        } else if (m > 0.25 && m <= 0.5) {
            x = Phaser.Math.Between(50, scene.w - 50);
            y = Phaser.Math.Between(scene.h - 200, scene.h - 50);
        } else if (m > 0.5 && m <= 0.75) {
            x = Phaser.Math.Between(50, 200);
            y = Phaser.Math.Between(50, scene.h - 50);
        } else {
            x = Phaser.Math.Between(scene.w - 200, scene.w - 50);
            y = Phaser.Math.Between(50, scene.h - 50);

        }


        super(scene, x, y, "zombie");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.play("zombie_anim", true);
        this.setScale(0.25);
        this.speed = Phaser.Math.Between(100, 350);
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