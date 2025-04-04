from rivescript import RiveScript
from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

bot = RiveScript()
bot.load_directory(os.getcwd())
bot.sort_replies()


@app.route('/')
def index():
    return send_from_directory('build','index.html')

@app.route("/<path:path>")
def home(path):
    return send_from_directory('build', path)

@app.route('/getReply', methods=['POST'])
def get_reply():
    msg = request.form.get("msg", '')
    print(msg)
    reply = bot.reply("localuser", msg)
    print(msg)
    return reply


if __name__ == '__main__':
    app.run()
