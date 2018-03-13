function testInit() {
    f1 = new Field(0, createVector(Defaults.width / 2, Defaults.width / 2));
    f2 = new Field(0, createVector(Defaults.width / 2 + 70, Defaults.width / 2));
    f3 = new Field(0, createVector(Defaults.width / 2 - 70, Defaults.width / 2));
    f4 = new Field(0, createVector(Defaults.width / 2, Defaults.width / 2 + 70));
    f5 = new Field(0, createVector(Defaults.width / 2, Defaults.width / 2 - 70));
    f6 = new Field(0, createVector(Defaults.width / 2 + 140, Defaults.width / 2));
    f7 = new Field(0, createVector(Defaults.width / 2 - 140, Defaults.width / 2));
    f8 = new Field(0, createVector(Defaults.width / 2, Defaults.width / 2 + 140));
    f9 = new Field(0, createVector(Defaults.width / 2, Defaults.width / 2 - 140));
    f10 = new Field(0, createVector(Defaults.width / 2 - 70, Defaults.width / 2 - 70));
    f11 = new Field(0, createVector(Defaults.width / 2 - 70, Defaults.width / 2 + 70));
    f12 = new Field(0, createVector(Defaults.width / 2 + 70, Defaults.width / 2 - 70));
    f13 = new Field(0, createVector(Defaults.width / 2 + 70, Defaults.width / 2 + 70));
    Game.fields.push(f1);
    Game.fields.push(f2);
    Game.fields.push(f3);
    Game.fields.push(f4);
    Game.fields.push(f5);
    Game.fields.push(f6);
    Game.fields.push(f7);
    Game.fields.push(f8);
    Game.fields.push(f9);
    Game.fields.push(f10);
    Game.fields.push(f11);
    Game.fields.push(f12);
    Game.fields.push(f13);
}
console.log($("#score"));

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    Game.canvas.position(x, y);
}


function setup() {
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
    Defaults.paperWeight = int(Defaults.size / 14);
    Defaults.weight = Defaults.paperWeight * 2;
    Defaults.middleLineWeight = int(Defaults.weight * 0.2);
    if (Defaults.middleLineWeight === 0) {
        Defaults.middleLineWeight = 1;
    }
    Game.canvas = createCanvas(Defaults.width, Defaults.heigth);
    // centerCanvas();
    Defaults.paperLineColor = color(150, 150, 150);
    Game.paper = new Paper();
    background(Defaults.background);
    Game.canvas.parent('sketch');
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

Socket.socket.on('play_response', function (data) {
    console.log(data);
    Game.turn = data.turn;
    let line = Game.paper.lines[data.id];
    let fillColor = color(
        data.color.r,
        data.color.g,
        data.color.b,
        data.color.a
    );
    line.click(fillColor);
});

Socket.socket.on('play_again_response', function (data) {
   Game.turn = data.turn;
});
