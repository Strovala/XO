class Socket { }
Socket.connect = function () {
    Socket.socket = io.connect('http://' + document.domain + ':' + location.port);

    Socket.socket.on('play_response', function (data) {
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


    Socket.socket.on('init_response', function (data) {
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
            Game.fillStarters();
        }
    });
};