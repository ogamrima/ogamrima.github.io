class Treasure extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        console.log(x, y, number);
        super(scene, x, y, scene.treasureColors[number]);
        this.number = number;
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setScale(0.5);
        this.value = (this.number + 1) * 500;
    }
    activate() {
        this.setActive(true);
        this.setVisible(true);
    }
}