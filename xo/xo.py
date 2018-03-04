from flask import Flask, send_from_directory, render_template, request, json
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start():
    body = request.form
    return render_template('game.html', message=body.get('name'))


@socketio.on('connect')
def connect_handler():
    emit('connect',
         {'message': '{0} has joined'},
         broadcast=True)


@socketio.on('play')
def handle_my_custom_event(data):
    print('received json: ' + str(data))


if __name__ == '__main__':
    socketio.run(app)



# # Object that represents a socket connection
# class Socket:
#     def __init__(self, sid):
#         self.sid = sid
#         self.connected = True
#
#     # Emits data to a socket's unique room
#     def emit(self, event, data):
#         emit(event, data, room=self.sid)
#
# @socketio.on('connect')
# def foo():
#     sockets[request.sid] = Socket(request.sid)