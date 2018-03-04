class Game {
}

Game.lineIdCnt = 0;
Game.lines = [];
Game.fields = [];

class Paper {
}

Paper.show = function () {
    let offsetX = (Defaults.width%Defaults.size)/2;
    let offsetY = (Defaults.heigth%Defaults.size)/2;
    // Defaults.width+Defaults.size because of that number of parallel lines needed
    // for drawing n linked fields is n+1
    for (let x = offsetX - Defaults.size; x < Defaults.width + Defaults.size; x += Defaults.size) {
        //let id = 0;
        let line;
        for (let y = offsetX - Defaults.size; y < Defaults.heigth + Defaults.size; y += Defaults.size) {
            //id++;
            line = new Line(undefined,
                createVector(x, y),
                createVector(x, y + Defaults.size),
                Defaults.paperLineColor, Defaults.paperWeight);
            line.show();
        }
    }

    for (let y = offsetY - Defaults.size; y < Defaults.heigth + Defaults.size; y += Defaults.size) {
        //let id = 0;
        let line;
        for (let x = offsetY - Defaults.size; x < Defaults.width + Defaults.size; x += Defaults.size) {
            //id++;
            line = new Line(undefined,
                createVector(x,                 y),
                createVector(x + Defaults.size, y),
                Defaults.paperLineColor, Defaults.paperWeight);
            line.show();
        }
    }
};

class Defaults {
}

Defaults.width = 650;
Defaults.heigth = 650;
Defaults.edgeOffset = 20;
Defaults.size = 70; //fixed
Defaults.boardSize = 5;
Defaults.weight = 10;
Defaults.color = 30;
Defaults.background = 230;
Defaults.paperWeight = 5;

function setup() {
    createCanvas(Defaults.width, Defaults.heigth);
    Defaults.paperLineColor = color(0, 0, 0, 60);
    background(Defaults.background);
    f1 = new Field(0, createVector(350, 350));
    f2 = new Field(0, createVector(350 + 70, 350));
    f3 = new Field(0, createVector(350 - 70, 350));
    f4 = new Field(0, createVector(350, 350 + 70));
    f5 = new Field(0, createVector(350, 350 - 70));
    f2 = new Field(0, createVector(350 + 140, 350));
    f3 = new Field(0, createVector(350 - 140, 350));
    f4 = new Field(0, createVector(350, 350 + 140));
    f5 = new Field(0, createVector(350, 350 - 140));
    f5 = new Field(0, createVector(350 - 70, 350 - 70));
    f5 = new Field(0, createVector(350 - 70, 350 + 70));
    f5 = new Field(0, createVector(350 + 70, 350 - 70));
    f5 = new Field(0, createVector(350 + 70, 350 + 70));
    Game.fields.push(f1);
    Game.fields.push(f2);
    Game.fields.push(f3);
    Game.fields.push(f4);
    Game.fields.push(f5);
}

function draw() {
    background(Defaults.background);
    Paper.show();


    /*Game.lines.forEach(function (line) {
        line.show();
    });*/


}

function mousePressed() {
    Game.lines.forEach(function (line) {
        if (line.intersects(mouseX, mouseY)) {
            line.color = color(255, 0, 0);
        }
    })
}

class Line {
    constructor(id, start, end, lineColor, weight, playable) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.color = lineColor || Defaults.color;
        this.weight = weight || Defaults.weight;
        this.playable = playable;
    }

    show() {
        stroke(this.color);
        strokeWeight(this.weight);

        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    intersects(mouseX, mouseY) {
        // Here we can use this.end.y also, because we have rectangular shapes
        // Because of that x OR y of start and end will be the same
        // Who doesn't understand please do some math
        let checkYhorizontal = mouseY > this.start.y - this.weight && mouseY < this.start.y + this.weight;
        let checkXhorizontal = (
            mouseX > min(this.start.x, this.end.x) &&
            mouseX < max(this.start.x, this.end.x)
        );
        let checkYvertical = (
            mouseY > min(this.start.y, this.end.y) &&
            mouseY < max(this.start.y, this.end.y)
        );
        let checkXvertical = mouseX > this.start.x - this.weight && mouseX < this.start.x + this.weight;
        let isHorizontal = this.start.y === this.end.y;
        let isVertical = this.start.x === this.end.x;
        return (
            (isHorizontal && checkXhorizontal && checkYhorizontal) ||
            (isVertical && checkXvertical && checkYvertical)
        )
    }


}

class Field {
    constructor(id, position, size) {
        this.id = id;
        this.position = position;
        this.size = size || Defaults.size;
        this.edges = [];
        let corners = [
            p5.Vector.add(position, createVector(-1, -1).mult(this.size / 2)),
            p5.Vector.add(position, createVector(-1, 1).mult(this.size / 2)),
            p5.Vector.add(position, createVector(1, 1).mult(this.size / 2)),
            p5.Vector.add(position, createVector(1, -1).mult(this.size / 2))
        ];
        for (let i = 0; i < 3; i++) {
            let edge = new Line(Game.lineIdCnt, corners[i], corners[i + 1]);
            //Game.lineIdCnt++;
            //Game.lines.push(edge);
            this.edges.push(edge);
        }
        let edge = new Line(Game.lineIdCnt, corners[3], corners[0]);
        //Game.lineIdCnt++;
        //Game.lines.push(edge);
        this.edges.push(edge);
    }
}
