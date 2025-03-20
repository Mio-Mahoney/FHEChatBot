from rivescript import RiveScript
from flask import Flask, request
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

bot = RiveScript()
bot.load_directory(os.getcwd())
bot.sort_replies()


@app.route('/')
def welcome():
    return "Welcome to my chat bot!"

@app.route('/getReply', methods=['POST'])
def get_reply():
    msg = request.form.get("msg", '')
    print(msg)
    reply = bot.reply("localuser", msg)
    print(msg)
    return reply


if __name__ == '__main__':
    app.run()
