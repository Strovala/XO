let socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function (data) {
    console.log(data);
});