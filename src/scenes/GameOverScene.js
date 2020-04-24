class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: "GameOverScene"
        })
        this.name = null;
        this.round = null;
        this.score = null;
        this.kills = null;
        this.timeSurvived = null;
        this.nameLabel = null;
        this.roundLabel = null;
        this.scoreLabel = null;
        this.killsLabel = null;
        this.timeSurvivedLabel = null;
    }
    init(data) {
        this.name = data.name;
        this.round = data.round;
        this.score = data.score;
        this.kills = data.kills;
        this.timeSurvived = Math.round(data.time);
    }
    create() {
        this.add.image(400, 300, "menu_bg");
        this.add.text(300, 100, "GAMEOVER", {
            font: "50px Tahoma",
            color: "red"
        });
        this.styleConfig = {
            fontSize: "15px",
            fontFamily: "Tahoma",
            color: "white"
        }
        this.add.text(100, 300, this.name, this.styleConfig);
        this.add.text(400, 300, this.score, this.styleConfig);
        this.add.text(500, 300, this.kills, this.styleConfig);
        this.add.text(600, 300, this.timeSurvived, this.styleConfig);

    }
}