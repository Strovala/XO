class Line {
    constructor(id, start, end, lineColor, weight) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.color = lineColor || Defaults.color;
        this.weight = weight || Defaults.paperWeight;
        this.playable = false;
        this.clicked = false;
        this.fields = [];
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
        let checkYhorizontal = mouseY > this.start.y - Defaults.clickOffset && mouseY < this.start.y + Defaults.clickOffset;
        let checkXhorizontal = (
            mouseX > min(this.start.x, this.end.x) + Defaults.lineOffset &&
            mouseX < max(this.start.x, this.end.x) - Defaults.lineOffset
        );

        let checkXvertical = mouseX > this.start.x - Defaults.clickOffset && mouseX < this.start.x + Defaults.clickOffset;
        let checkYvertical = (
            mouseY > min(this.start.y, this.end.y) + Defaults.lineOffset &&
            mouseY < max(this.start.y, this.end.y) -Defaults.lineOffset
        );

        let isHorizontal = this.start.y === this.end.y;
        let isVertical = this.start.x === this.end.x;
        return (
            (isHorizontal && checkXhorizontal && checkYhorizontal) ||
            (isVertical && checkXvertical && checkYvertical)
        )
    }

    getHashKey() {
        return [
            this.start.x + " " + this.start.y + " " + this.end.x + " " + this.end.y,
            this.end.x + " " + this.end.y + " " + this.start.x + " " + this.start.y
        ]
    }

    click(color) {
        this.clicked = true;
        this.color = color;
        this.weight = Defaults.weight;
        this.fields.forEach(function (field) {
            field.checkFilled();
        });
    }

}