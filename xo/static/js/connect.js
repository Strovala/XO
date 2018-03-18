class Socket { }
Socket.connect = function () {
    Socket.socket = io.connect('http://' + document.domain + ':' + location.port);

    Socket.socket.on('play_response', function (data) {
        Game.me.turn = data.turn;
        Game.opponent.turn = !data.turn;
        let fieldId = int(data.id.split(" ")[0]);
        let dir = data.id.split(" ")[1];
        let line = Field.fieldsList[fieldId].edges[dir];
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
        Game.opponent.turn = !data.turn;
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

            Game.player1 = new Player(Defaults.player1name, Game.horizontal);
            Game.player2 = new Player(Defaults.player2name, Game.vertical);
            Game.players = [Game.player1, Game.player2];

            Game.me = Game.player2;
            Game.opponent = Game.player1;
            Game.opponent.switchTurn();
            if (data.turn) {
                Game.me = Game.player1;
                Game.me.turn = data.turn;
                Game.opponent = Game.player2;
                Game.opponent.turn = !data.turn;
            }

            Game.myColor = color(
                data.color.r,
                data.color.g,
                data.color.b,
                data.color.a
            );
            Game.connected = true;
            Game.fillStarters();
        }
    });
};