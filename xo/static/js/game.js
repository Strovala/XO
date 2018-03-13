class Game {
}

Game.lineIdCnt = 0;
Game.lines = {};
Game.fields = {};
Game.lines.forEach = function (callback) { //this.lines is new object inside Paper object
    for (let property in this) { //there this refers to this.lines and that refers to Paper
        if (this.hasOwnProperty(property) &&
            typeof this[property] !== 'function' // We don't want to call callback on a functions
        ) {
            callback(this[property]);
        }
    }
};
Game.fields.forEach = function (callback) { //this.lines is new object inside Paper object
    for (let property in this) { //there this refers to this.lines and that refers to Paper
        if (this.hasOwnProperty(property) &&
            typeof this[property] !== 'function' // We don't want to call callback on a functions
        ) {
            callback(this[property]);
        }
    }
};
Game.fields.get = function (x, y) {
    let key = x + " " + y;
    return this[key];
};

Game.generateFields = function () {
    for (let x = Game.paper.offsetX + Defaults.size / 2, i = 0; x < Defaults.width; x += Defaults.size, i++) {
        for (let y = Game.paper.offsetY + Defaults.size / 2, j = 0; y < Defaults.heigth; y += Defaults.size, j++) {
            let key = i + " " + j;
            Game.fields[key] = new Field(undefined, createVector(x, y));
        }
    }
};

Game.setBoard = function () {
    // This because fieldsCntX and Y and boardSize are always odd, they need to be
    let indexX = (Game.paper.fieldsCntX-1) / 2;
    let indexY = (Game.paper.fieldsCntY-1) / 2;
    let boardHalfCnt = (Defaults.boardSize-1) / 2;
    let centerField = Game.fields.get(indexX, indexY);
    centerField.setPlayable();
    for (let i = 1; i < boardHalfCnt+1; i++) {
        let fields = [
            Game.fields.get(indexX + i, indexY),
            Game.fields.get(indexX - i, indexY),
            Game.fields.get(indexX, indexY + i),
            Game.fields.get(indexX, indexY - i)
        ];
        fields.forEach(function (field) {
            field.setPlayable();
        });
        if (i === boardHalfCnt) {
            let fillColor = Game.horizontal;
            let j = 0;
            fields.forEach(function (field) {
                if (j >= 2) {
                    fillColor = Game.vertical;
                }
                field.edges.forEach(function (edge) {
                    edge.border = true;
                    edge.click(fillColor);
                });
                j++;
            });
        }
    }
    // setting north fields
    for (let i = 1; i < boardHalfCnt; i++) {
        for (let l = 1; l < boardHalfCnt + 1 - i; l++) {
            let field = Game.fields.get(indexX - l, indexY - i);
            field.setPlayable();
            if (l === boardHalfCnt - i) {
                field.edges.w.border = true;
                field.edges.w.click(color(0, 0, 0));
                field.edges.n.border = true;
                field.edges.n.click(color(0, 0, 0));
            }
        }
        for (let l = 1; l < boardHalfCnt + 1 - i; l++) {
            let field = Game.fields.get(indexX + l, indexY - i);
            field.setPlayable();
            if (l === boardHalfCnt - i) {
                field.edges.e.border = true;
                field.edges.e.click(color(0, 0, 0));
                field.edges.n.border = true;
                field.edges.n.click(color(0, 0, 0));
            }
        }
    }
    // setting south fields
    for (let i = 1; i < boardHalfCnt; i++) {
        for (let l = 1; l < boardHalfCnt + 1 - i; l++) {
            let field = Game.fields.get(indexX - l, indexY + i);
            field.setPlayable();
            if (l === boardHalfCnt - i) {
                field.edges.w.border = true;
                field.edges.w.click(color(0, 0, 0));
                field.edges.s.border = true;
                field.edges.s.click(color(0, 0, 0));
            }
        }
        for (let l = 1; l < boardHalfCnt + 1 - i; l++) {
            let field = Game.fields.get(indexX + l, indexY + i);
            field.setPlayable();
            if (l === boardHalfCnt - i) {
                field.edges.e.border = true;
                field.edges.e.click(color(0, 0, 0));
                field.edges.s.border = true;
                field.edges.s.click(color(0, 0, 0));
            }
        }
    }
};