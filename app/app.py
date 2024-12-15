from flask import Flask, request, jsonify, render_template
from transformers import pipeline
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Needed for Flask-WTF forms

# Load the default model
default_model = pipeline("text-generation", model="gpt2")

@app.route("/")
def home():
    return render_template("index.html")  # Serve the UI

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json or {}
    prompt = data.get("prompt", "").strip()
    model_name = data.get("model", "gpt2")  # Default to GPT-2

    if not prompt:
        return jsonify({"error": "Prompt is empty. Please enter a valid input."}), 400

    try:
        # Load the selected model
        model = pipeline("text-generation", model=model_name)
        result = model(prompt, max_length=50, num_return_sequences=1)
        return jsonify({"result": result[0]["generated_text"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
