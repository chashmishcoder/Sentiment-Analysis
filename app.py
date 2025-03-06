from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Update this later with the frontend URL

# Load the pre-trained model and vectorizer
try:
    model = joblib.load('sentiment_model.joblib')
    vectorizer = joblib.load('tfidf_vectorizer.joblib')
    print("Model and vectorizer loaded successfully")
except Exception as e:
    print(f"Error loading model or vectorizer: {e}")

@app.route('/')
def home():
    return "Sentiment Analysis API"

@app.route('/predict', methods=['POST'])
def predict():
    print("Received predict request")
    print("Form data:", request.form)
    print("Files:", request.files)

    if 'file' in request.files and request.files['file'].filename:
        file = request.files['file']
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
            if 'text' not in df.columns:
                return jsonify({'error': 'CSV must have a "text" column'}), 400
            text_data = df['text'].values
        else:
            return jsonify({'error': 'Please upload a CSV file'}), 400
    else:
        text = request.form.get('text', '').strip()
        text_data = [text] if text else []

    print(f"Text data: {text_data}")
    if len(text_data) == 0:
        return jsonify({'error': 'No text provided'}), 400

    # Transform text data using the vectorizer
    X = vectorizer.transform(text_data)
    # Predict sentiment
    predictions = model.predict(X)
    print(f"Predictions: {predictions}")

    # Define sentiment label mapping
    sentiment_map = {0: "negative", 1: "positive", 2: "neutral"}

    # Generate distribution
    total = len(predictions)
    distribution = {
        'positive': (predictions == 1).sum() / total if total > 0 else 0,
        'neutral': (predictions == 2).sum() / total if total > 0 else 0,
        'negative': (predictions == 0).sum() / total if total > 0 else 0
    }

    # Prepare response with mapped sentiment and distribution
    result = [sentiment_map.get(p, str(p)) for p in predictions]
    return jsonify({
        'prediction': result[0] if len(result) == 1 else result,
        'distribution': distribution
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)