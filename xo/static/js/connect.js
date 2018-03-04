class Socket { }
Socket.socket = io.connect('http://' + document.domain + ':' + location.port);
Socket.socket.on('connect', function (data) {
    console.log(data);
});
