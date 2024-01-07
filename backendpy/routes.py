from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from dotenv import load_dotenv
import os
# Assuming you have a separate module for this
from openai_integration import botResponse

load_dotenv()

app = Flask(__name__)
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
        messages_cursor = mongo.db.messages.find({})
        messages_list = list(messages_cursor)  # Convert cursor to list
        return dumps(messages_list), 200  # Convert list to JSON string
    except Exception as e:
        print(e)  # For debugging purposes, print the exception to the console
        return jsonify(error=str(e)), 500


if __name__ == '__main__':
    app.run(debug=True)
