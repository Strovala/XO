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

function setup() {
    createCanvas(Defaults.width, Defaults.heigth);
    Defaults.paperLineColor = color(150, 150, 150);
    background(Defaults.background);
    Game.myColor = color(0, 0, 0);
    Game.paper = new Paper();
    // Game.generateFields();
    // Game.setBoard();
    // testInit();
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
