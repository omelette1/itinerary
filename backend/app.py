from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import os

app = Flask(__name__)
CORS(app)
uri = "mongodb+srv://owen:<owenchen1234@cluster0.ianzjcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


# Replace with your connection string
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["events_db"]
events = db["events"]

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@app.route("/add-event", methods=["POST"])
def add_event():
    data = request.get_json()
    text = data.get("text")
    date = data.get("date")
    if text and date:
        event = {"text": text, "date": date}
        events.insert_one(event)
        return jsonify({"message": "Event added"}), 201
    return jsonify({"error": "Invalid data"}), 400

@app.route("/get-events", methods=["GET"])
def get_events():
    result = list(events.find({}, {"_id": 0}))
    return jsonify(result)

db = client["user_db"]
users = db["users"]

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    phone = data.get("phone")

    if not (username and password and phone):
        return jsonify({"error": "Missing required fields"}), 400

    users.insert_one({
        "username": username,
        "password": password,
        "phone": phone
    })

    return jsonify({"message": "User signed up successfully"}), 201

if __name__ == "__main__":
    app.run(debug=True)