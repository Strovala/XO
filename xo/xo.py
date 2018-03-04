from flask import Flask, send_from_directory, render_template, request, json
from flask_socketio import SocketIO


app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start():
    body = request.form
    return render_template('game.html', message=body.get('name'))


if __name__ == '__main__':
    socketio.run()
