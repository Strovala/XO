class Defaults {
}

// weight and height divided by boardSize needs to be odd number
Defaults.boardSize = 13;
Defaults.fixedSize = 70;
Defaults.color = 30;
Defaults.background = 230;
Defaults.player1name = "Player 1";
Defaults.player2name = "Player 2";




// TODO: premestiti u poseban fajl (player.js)

class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.score = 0;
    }
}

function scoreInc(player) {
    player.score++;
}

function drawScore() {
    Defaults.scoreSize = Defaults.heigth * 0.17; // TODO

    let text1 = Game.player1.score;
    let text2 = Game.player2.score;
    let text3 = "";
    let text4 = "";

    if (Game.player1.score > Field.fieldsList.length / 2) {
        text3 = "W";
        text4 = "L";
    }
    if (Game.player2.score > Field.fieldsList.length / 2) {
        text3 = "L";
        text4 = "W";
    }
    textSize(Defaults.scoreSize);
    fill(Game.player1.color);
    text(text1, height * 0.05, height * 0.17);
    text(text3, height * 0.05, height * 0.95);
    fill(Game.player2.color);
    text(text2, width - (height * 0.05 + textWidth(text2)), height * 0.17);
    text(text4, width - (height * 0.05 + textWidth(text4)), height * 0.95);
}

//TODO: povecati velicinu papira, podesiti player name za oba igraca