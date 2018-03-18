class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.score = 0;
        this.turn = false;
    }

    switchTurn() {
        this.turn = !this.turn;
    }
}

function scoreInc(player) {
    player.score++;
}

function drawScore() {
    let scorePlayer1 = Game.player1.score;
    let scorePlayer2 = Game.player2.score;
    let statusPlayer1 = "";
    let statusPlayer2 = "";

    if (Game.player1.score > Field.fieldsList.length / 2) {
        statusPlayer1 = "W";
        statusPlayer2 = "L";
    }
    if (Game.player2.score > Field.fieldsList.length / 2) {
        statusPlayer1 = "L";
        statusPlayer2 = "W";
    }

    if (Game.player1.turn) {
        scorePlayer1 = Game.player1.score + " *";
    }
    else {
        scorePlayer2 = "* " + Game.player2.score;
    }

    Defaults.scoreSize = Defaults.heigth * 0.2; // TODO
    textFont(Defaults.font);
    textSize(Defaults.scoreSize);
    fill(Game.player1.color);
    text(scorePlayer1, height * 0.05, height * 0.17);
    text(statusPlayer1, height * 0.05   , height * 0.95);
    fill(Game.player2.color);
    text(scorePlayer2, width - (height * 0.05 + textWidth(scorePlayer2.toString())), height * 0.17);
    text(statusPlayer2, width - (height * 0.05 + textWidth(statusPlayer2)), height * 0.95);
}