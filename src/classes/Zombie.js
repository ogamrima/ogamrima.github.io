class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed, health) {
        console.log(x, y, speed, health);
        super(scene, x, y, "zombie");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.play("zombie_anim", true);
        this.setScale(0.25);

        this.body.setSize(130, 130).setOffset(80, 90);
        this.speed = speed;
        this.health = health;
        //this.setBounce(2);
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
            this.scene.score += (100 * this.scene.multiplier * this.scene.weaponMultiplier);
            this.scene.scoreLabel.text = this.scene.score;
            this.scene.kills++;
            this.destroy();


        }
    }
}