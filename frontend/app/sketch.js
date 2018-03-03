class Game { }
Game.lineIdCnt = 0;
Game.lines = [];
Game.fields = [];

class Paper { }

Paper.show = function () {
    for (let x = Defaults.size/2; x < Defaults.width; x+=Defaults.size) {
        let line = new Line(undefined, createVector(x, 0), createVector(x, Defaults.heigth), Defaults.paperLineColor, Defaults.paperWeight);
        line.show();
    }
    for (let y = Defaults.size/2; y < Defaults.heigth; y+=Defaults.size) {
        let line = new Line(undefined, createVector(0, y), createVector(Defaults.width, y), Defaults.paperLineColor, Defaults.paperWeight);
        line.show();
    }
};

class Defaults { }
Defaults.width = 770;
Defaults.heigth = 770;
Defaults.weight = 10;
Defaults.size = 70;
Defaults.background = 230;
Defaults.paperWeight = 5;

function setup() {
    createCanvas(Defaults.width, Defaults.heigth);
    Defaults.paperLineColor = color(0, 0, 0, 60);
    Defaults.color = Defaults.paperLineColor;
    background(Defaults.background);
    f1 = new Field(0, createVector(350, 350));
    f2 = new Field(0, createVector(350+70, 350));
    f3 = new Field(0, createVector(350-70, 350));
    f4 = new Field(0, createVector(350, 350+70));
    f5 = new Field(0, createVector(350, 350-70));
    f2 = new Field(0, createVector(350+140, 350));
    f3 = new Field(0, createVector(350-140, 350));
    f4 = new Field(0, createVector(350, 350+140));
    f5 = new Field(0, createVector(350, 350-140));
    f5 = new Field(0, createVector(350-70, 350-70));
    f5 = new Field(0, createVector(350-70, 350+70));
    f5 = new Field(0, createVector(350+70, 350-70));
    f5 = new Field(0, createVector(350+70, 350+70));
    Game.fields.push(f1);
    Game.fields.push(f2);
    Game.fields.push(f3);
    Game.fields.push(f4);
    Game.fields.push(f5);
}

function draw() {
    background(Defaults.background);
    Paper.show();

    Game.lines.forEach(function (line) {
        line.show();
    });
}

function mousePressed() {
    Game.lines.forEach(function (line) {
        if (line.intersects(mouseX, mouseY)) {
            line.color = color(255, 0, 0);
        }
    })
}

class Line {
    constructor(id, start, end, lineColor, weight) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.color = lineColor || Defaults.color;
        this.weight = weight || Defaults.weight;
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
        let isVertical =   this.start.x === this.end.x;
        return (
            (isHorizontal && checkXhorizontal && checkYhorizontal) ||
            (isVertical   && checkXvertical   && checkYvertical)
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
            p5.Vector.add(position, createVector(-1,  1).mult(this.size / 2)),
            p5.Vector.add(position, createVector( 1,  1).mult(this.size / 2)),
            p5.Vector.add(position, createVector( 1, -1).mult(this.size / 2))
        ];
        for (let i = 0; i < 3; i++) {
            let edge = new Line(Game.lineIdCnt, corners[i], corners[i+1]);
            Game.lineIdCnt++;
            Game.lines.push(edge);
            this.edges.push(edge);
        }
        let edge = new Line(Game.lineIdCnt, corners[3], corners[0]);
        Game.lineIdCnt++;
        Game.lines.push(edge);
        this.edges.push(edge);
    }
}