from flask import Flask, send_from_directory, render_template, request, json
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)


sockets = {}
colors = {
    'horizontal': {
        'r': 255,
        'g': 0,
        'b': 255,
        'a': 255
    },
    'vertical': {
        'r': 255,
        'g': 255,
        'b': 0,
        'a': 255
    }
}


# Object that represents a socket connection
class Socket:
    def __init__(self, sid, color, opponent_color, turn):
        self.sid = sid
        self.connected = True
        self.color = color
        self.opponent_color = opponent_color
        self.turn = turn

    # Emits data to a socket's unique room
    def emit(self, event, data):
        emit(event, data, room=self.sid)

    def switch_turn(self):
        self.turn = not self.turn


@app.route('/')
def home():
    return render_template(
        'index.html',
        username_maxlength=12
    )


@socketio.on('connect')
def handle_connect():
    print("someone connected")
    color, opponent_color, turn = (
        (colors.get('horizontal'), colors.get('vertical'), True)
        if len(sockets) % 2 else
        (colors.get('vertical'), colors.get('horizontal'), False)
    )
    sockets[request.sid] = Socket(request.sid, color, opponent_color, turn)


@socketio.on('init')
def init():
    response = {
        'message': 'You are connected with id={}'.format(request.sid),
        'horizontal': colors.get('horizontal'),
        'vertical': colors.get('vertical'),
        'turn': sockets[request.sid].turn,
        'color': sockets[request.sid].color
    }
    return response


@socketio.on('play')
def play(data):
    print('received json: ' + str(data))
    color = sockets[request.sid].color
    for id, socket in sockets.items():
        socket.switch_turn()
        socket.emit(
            'play_response', {
                'id': data.get('id'),
                'color': color,
                'turn': socket.turn
            }
        )


@socketio.on('play_again')
def play_again():
    for id, socket in sockets.items():
        socket.switch_turn()
        socket.emit(
            'play_again_response', {
                'turn': socket.turn
            }
        )


if __name__ == '__main__':
    socketio.run(app)
