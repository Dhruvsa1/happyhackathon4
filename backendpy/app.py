from flask_pymongo import PyMongo
import os
from bson.json_util import dumps
from flask_cors import CORS
from flask import Flask, jsonify, request, send_from_directory
from dotenv import load_dotenv
from openai_integration import botResponse

load_dotenv()


app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)




@app.route('/messages/<string:msg_id>', methods=['PATCH'])
def handle_prompt(msg_id):
    try:
        messages = mongo.db.messages.find_one_or_404({'_id': msg_id})
        prompt = request.json.get('prompt')
        messages['messages'].append({'role': 'user', 'content': prompt})

        # Assuming you have a separate function that handles bot responses
        response = botResponse(messages['messages'])
        messages['messages'].append(response)

        mongo.db.messages.update_one({'_id': msg_id}, {'$set': messages})
        return jsonify(response), 200
    except Exception as e:
        return jsonify(str(e)), 500


@app.route('/messages', methods=['POST'])
def post_message():
    try:
        new_message = request.json
        mongo.db.messages.insert_one(new_message)
        return jsonify({'message': 'Publication saved!'}), 201
    except Exception as e:
        return jsonify(str(e)), 500


@app.route('/messages', methods=['GET'])
def get_messages():
    try:
        messages_cursor = mongo.db.messages.find()
        messages_list = list(messages_cursor)  # Convert cursor to list
        print(messages_list)  # Print the list to the console for debugging
        return dumps(messages_list), 200
    except Exception as e:
        print(e)  # Print the exception to the console
        return jsonify({'error': str(e)}), 500



@app.errorhandler(404)
def not_found(e):
    if request.accept_mimetypes.accept_html:
        return send_from_directory('views', '404.html'), 404
    elif request.accept_mimetypes.accept_json:
        return jsonify(error="404 Not Found"), 404
    else:
        return '404 Not Found', 404


if __name__ == "__main__":
    app.run(debug=True, port=os.getenv("PORT"))
