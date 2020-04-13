class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, health, speed) {
        super(scene, x, y, key);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds();
        this.setScale(0.25);
        this.setOrigin(0.4, 0.45);
        this.body.setCircle(70, 50, 20);
        //this.play("player_anim", true);
        this.health = health;
        this.damage = 100;
        this.dead = false;
        this.speed = speed;
    }
}