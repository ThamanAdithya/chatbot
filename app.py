from flask import Flask, render_template, request, jsonify
import cohere
from dotenv import load_dotenv
import os

load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"response": "Please enter a message."})

    response = co.chat(
        message=user_input,
        model="command-r",
        temperature=0.7
    )
    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True)
