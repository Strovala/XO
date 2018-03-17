class Socket { }
Socket.connect = function () {
    Socket.socket = io.connect('http://' + document.domain + ':' + location.port);
    Socket.socket.on('connect', function () {
        Socket.socket.emit('init', function (data) {
            if (data) {
                Game.horizontal = color(
                    data.horizontal.r,
                    data.horizontal.g,
                    data.horizontal.b,
                    data.horizontal.a
                );
                Game.vertical = color(
                    data.vertical.r,
                    data.vertical.g,
                    data.vertical.b,
                    data.vertical.a
                );
                Game.myColor = color(
                    data.color.r,
                    data.color.g,
                    data.color.b,
                    data.color.a
                );
                Game.turn = data.turn;
                Game.connected = true;
                Game.generateFields();
                Game.setBoard();
            }
        })
    });


    Socket.socket.on('play_response', function (data) {
        Game.turn = data.turn;
        let fieldId = parseInt(data.id.split(" ")[0]);
        let dir = data.id.split(" ")[1];
        let line = Field.fieldsList[fieldId].edges[dir];// Game.paper.lines[data.id];
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
};