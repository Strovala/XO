from flask import Flask, send_from_directory, render_template

app = Flask(__name__)


@app.route('/')
def show_entries():
    return render_template('index.html')
