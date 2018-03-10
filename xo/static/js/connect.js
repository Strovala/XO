class Socket { }
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
        console.log(data);
    })
});
