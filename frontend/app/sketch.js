
var d = 70;
var p1 = d;
var p2 = p1+d;
var p3 = p2+d;
var p4 = p3+d;
var lines = [];

function setup() {
    createCanvas(800, 800);
    background(12);
    l1 = new Line(0, createVector(p3, p3), createVector(p2, p3));
    l2 = new Line(1, createVector(p2, p3), createVector(p2, p2));
    l3 = new Line(2, createVector(p2, p2), createVector(p3, p2));
    l4 = new Line(3, createVector(p3, p2), createVector(p3, p3));
    lines.push(l1);
    lines.push(l2);
    lines.push(l3);
    lines.push(l4);
}

function draw() {
    lines.forEach(function (line) {
        line.show();
    })
}

function mousePressed() {
    lines.forEach(function (line) {
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
        this.color = lineColor || 153;
        this.weight = weight || 10;
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
        var checkYhorizontal = mouseY > this.start.y - 5 && mouseY < this.start.y + 5;
        var checkXhorizontal = (
            mouseX > min(this.start.x, this.end.x) &&
            mouseX < max(this.start.x, this.end.x)
        );
        var checkYvertical = (
            mouseY > min(this.start.y, this.end.y) &&
            mouseY < max(this.start.y, this.end.y)
        );
        var checkXvertical = mouseX > this.start.x - 5 && mouseX < this.start.x + 5;
        var isHorizontal = this.start.y === this.end.y;
        var isVertical =   this.start.x === this.end.x;
        return (
            (isHorizontal && checkXhorizontal && checkYhorizontal) ||
            (isVertical   && checkXvertical   && checkYvertical)
        )
    }
}
