from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/chat', methods=['POST', 'GET'])
def hello_world():
    print("----------"+request.data.decode("utf-8"))
    if request.method == 'POST':
        return 'response from backend '+request.data.decode("utf-8")


if __name__ == '__main__':
    app.run()
