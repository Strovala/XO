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
        this.border = false;
    }

    show() {
        stroke(this.color);
        if (this.playable && this.clicked) {
            stroke(0, 0, 0);
        }
        strokeWeight(this.weight);

        line(this.start.x, this.start.y, this.end.x, this.end.y);

        if (this.clicked && !this.border) {
            stroke(this.color);
            strokeWeight(Defaults.middleLineWeight);

            line(this.start.x, this.start.y, this.end.x, this.end.y);
        }


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
            mouseY < max(this.start.y, this.end.y) - Defaults.lineOffset
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

    click(fillColor) {
        this.clicked = true;
        this.weight = this.weight * 2;
        if (Game.connected) {
            this.color = fillColor;
            animation(this, 'weight', lineAnimationGenerator, this.weight, Defaults.weight*2, 100, Defaults.weight*2, Defaults.weight, 100);
            let playAgain = false;
            this.fields.forEach(function (field) {
                field.checkFilled(fillColor);
                // fillColor === Game.myColor will never be equal
                // because its comparing references
                let isMyColor = fillColor.toString() === Game.myColor.toString();
                if (field.filled && isMyColor) {
                    playAgain = true;
                }
            });
            if (playAgain) {
                Socket.socket.emit('play_again');
            }
        }
    }

}