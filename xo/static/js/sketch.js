function setup() {

}

function initialize() {
    Defaults.width = int(windowWidth*0.8);
        Defaults.heigth = int(windowHeight*0.8);
        Defaults.size = int(min(
            min(Defaults.width, Defaults.heigth) / Defaults.boardSize,
            Defaults.fixedSize
        ));
        let fieldCntMin = int(min(Defaults.width, Defaults.heigth) / Defaults.size);
        if (!(fieldCntMin % 2)) {
            Defaults.size *= 0.9;
        }
        Defaults.width += Defaults.size * 2;
        Defaults.heigth += Defaults.size * 2;
        let fieldCntMax = int(max(Defaults.width, Defaults.heigth) / Defaults.size);
        if (!(fieldCntMax % 2)) {
            if (Defaults.width > Defaults.heigth) {
                Defaults.width -= Defaults.size;
            }
            if (Defaults.heigth > Defaults.width) {
                Defaults.heigth -= Defaults.size;
            }
        }
        Defaults.clickOffset = Defaults.size * 0.2;
        Defaults.lineOffset = Defaults.size * 0.2;
        Defaults.paperWeight = max(int(Defaults.size / 14), 2);
        Defaults.weight = Defaults.paperWeight * 2;
        Defaults.middleLineWeight = int(Defaults.weight * 0.2);
        if (Defaults.middleLineWeight === 0) {
            Defaults.middleLineWeight = 1;
        }
        Game.canvas = createCanvas(Defaults.width, Defaults.heigth);
        // Socket.connect();
        Defaults.paperLineColor = color(150, 150, 150);
        Game.paper = new Paper();
        background(Defaults.background);
        Game.canvas.parent('sketch');
        Game.canvas.style('display', 'block');

        Game.generateFields();
        Game.setBoard();
        Socket.socket.emit('init', {
            size: Game.size

        });
}

function draw() {
    if (Game.connected) {
        background(Defaults.background);
        Game.paper.show();


        Game.fields.forEach(function (field) {
            field.show();
        });
    }
}

function mousePressed() {
    if (Game.connected) {
        let stop = false;
        Game.paper.lines.forEach(function (line) {
            if (!stop) {
                if (Game.turn && !line.clicked && line.playable && line.intersects(mouseX, mouseY)) {
                    Socket.socket.emit('play', {
                      id: line.getHashKey()[0]
                    });
                    // line.click(color(255, 255, 0));
                    stop = true;
                }
            }
        })
    }
}
