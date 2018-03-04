class Paper {
    constructor() {
        this.lines = {}; //object
        // In JavaScript functions are objects, you can even pass them as parameters
        let that = this; //there this refers to Paper object (that too)
        this.lines.forEach = function (callback) { //this.lines is new object inside Paper object
            for (let property in this) { //there this refers to this.lines and that refers to Paper
                if (this.hasOwnProperty(property) &&
                    typeof this[property] !== 'function' // We dont want to call callback on a functions
                ) {
                    callback(this[property]);
                }
            }
        };
        this.offsetX = (Defaults.width%Defaults.size)/2;
        this.offsetY = (Defaults.heigth%Defaults.size)/2;
        this.fieldsCntX = (Defaults.width / Defaults.size) | 0;
        this.fieldsCntY = (Defaults.heigth / Defaults.size) | 0;
        this.initialize();
    }

    initialize() {
        let offsetX = this.offsetX;
        let offsetY = this.offsetY;
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
                this.addLine(line);
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
                this.addLine(line);
            }
        }
    }



    show() {
        this.lines.forEach(function (line) {
            line.show();
        })
    }

    addLine(line) {
        let keys = line.getHashKey();
        let that = this; // Look at Paper constructor for more info :)
        keys.forEach(function (key) {
            that.lines[key] = line; //this.lines.o = 5 is the same like this.lines['o'] = 5
        })
    }
}