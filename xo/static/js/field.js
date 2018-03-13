class Field {
    constructor(id, position, size) {
        this.id = id;
        this.position = position;
        this.size = size || Defaults.size;
        this.color = color(Defaults.background);
        this.playable = false;
        this.filled = false;
        this.edges = {};
        this.edges.forEach = function (callback) { //this.lines is new object inside Paper object
            for (let property in this) { //there this refers to this.lines and that refers to Paper
                if (this.hasOwnProperty(property) &&
                    typeof this[property] !== 'function' // We dont want to call callback on a functions
                ) {
                    callback(this[property]);
                }
            }
        };
        this.initialize();
    }

    initialize() {
        let dirs = "wsen";
        let corners = [
            p5.Vector.add(this.position, createVector(-1, -1).mult(this.size / 2)),
            p5.Vector.add(this.position, createVector(-1, 1).mult(this.size / 2)),
            p5.Vector.add(this.position, createVector(1, 1).mult(this.size / 2)),
            p5.Vector.add(this.position, createVector(1, -1).mult(this.size / 2))
        ];
        for (let i = 0; i < 3; i++) {
            let start = corners[i];
            let end = corners[i+1];
            let key =  start.x + " " + start.y + " " + end.x + " " + end.y;
            let edge = Game.paper.lines[key];
            if (edge !== undefined) {
                edge.fields.push(this);
                this.edges[dirs[i]] = edge;
            }
        }
        let start = corners[3];
        let end = corners[0];
        let key =  start.x + " " + start.y + " " + end.x + " " + end.y;
        let edge = Game.paper.lines[key];
        if (edge !== undefined) {
            edge.fields.push(this);
            this.edges[dirs[3]] = edge;
        }
    }

    setPlayable() {
        this.playable = true;
        this.edges.forEach(function (edge) {
            edge.playable = true;
        });
    }

    show() {
        if (this.playable) {
            this.edges.forEach(function (edge) {
                if (edge.clicked)
                    edge.show();
            });
        }
        if (this.filled) {
            let startLine = this.edges.w;
            noStroke();
            fill(this.color);
            rect(
                startLine.start.x + startLine.weight/2,
                startLine.start.y + startLine.weight/2,
                this.size - startLine.weight,
                this.size - startLine.weight
            );
        }
    }

    checkFilled(color) {
        //let scoreLeft = document.getElementById('scoreLeft');
        let scoreLeft = $('#scoreLeft'); // Same as this above (jQuery)

        let clickedCnt = 0;
        this.edges.forEach(function (edge) {
            if (edge.clicked)
                clickedCnt++;
        });
        if (clickedCnt === 4) {
            let from = this.color;
            let to = color;
            let colors = [];
            let len = 100;
            for (let i = 0; i < len; i++) {
                colors.push(lerpColor(from, to, (i+1)/len));
            }
            colors.push(to);
            let that = this;
            function linear(that, colors) {
                if (colors.length === 0) {
                    return;
                }
                that.color = colors[0];
                colors.shift();
                setTimeout(function () {
                    linear(that, colors);
                }, 1);
            }
            linear(this, colors);
            // this.color = color;
            this.filled = true;
            score++;
            scoreLeft.text('Score: ' + score);
        }
    }
}
let score = 0;