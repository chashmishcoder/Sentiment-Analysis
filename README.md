
# Sentiment Analysis App

This is a Sentiment Analysis API built with Flask. It uses a pre-trained machine learning model to predict the sentiment of text data. The vectorizer is downloaded from Google Drive because of size constraint.

## Features

- Predict sentiment from text data
- Handle CSV file uploads with text data
- Provide sentiment distribution
- Generate a bar graph of sentiment distribution

## Requirements

- Python 3.6+
- Flask
- Flask-CORS
- pandas
- scikit-learn
- matplotlib
- joblib
- gdown
- requests

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/sentiment-analysis-app.git
   cd sentiment-analysis-app

2. Create a virtual environment and activate it:

   ```python
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required packages:
   ```python
   pip install -r requirements.txt
   ```

## Usage

1. Run the Flask application:
   ```python
   python app.py
   ```

2. The API will be available at [http://127.0.0.1:5001](https://127.0.0.1:5001)

Sure! You can add screenshots to your README.md file by including image links. Here is an updated version of your README.md file with placeholders for the screenshots:

```markdown
# Sentiment Analysis App

This Repo contains my NLP project on Sentiment Analysis.

## Features

- Predict sentiment from text data
- Handle CSV file uploads with text data
- Provide sentiment distribution
- Generate a bar graph of sentiment distribution

## Requirements

- Python 3.6+
- Flask
- Flask-CORS
- pandas
- scikit-learn
- matplotlib
- joblib
- gdown
- requests

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/sentiment-analysis-app.git
   cd sentiment-analysis-app
   ```

2. Create a virtual environment and activate it:

   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required packages:

   ```sh
   pip install -r requirements.txt
   ```

## Usage

1. Run the Flask application:

   ```sh
   python app.py
   ```

2. The API will be available at `http://127.0.0.1:5001`.

## API Endpoints

### `GET /`

Returns a simple message indicating that the API is running.

### `POST /predict`

Predicts the sentiment of the provided text data.

#### Request

- Form data:
  - `text`: A string containing the text to analyze.
- File upload:
  - `file`: A CSV file containing a column named `text`.

#### Response

- `200 OK`:
  - `prediction`: The predicted sentiment(s).
  - `distribution`: The distribution of sentiments.
  - `graph`: URL to the generated bar graph of sentiment distribution.
- `400 Bad Request`:
  - `error`: Error message indicating what went wrong.

## Example

### Request

```sh
curl -X POST -F "text=I love this project!" http://127.0.0.1:5001/predict
```

### Response

```json
{
  "prediction": "positive",
  "distribution": {
    "positive": 1.0,
    "neutral": 0.0,
    "negative": 0.0
  },
  "graph": "/static/graph.png"
}
```

## Screenshots

### Home Page
![Home Page](path/to/home_page_screenshot.png)

### Prediction Page
![Prediction Page](path/to/prediction_page_screenshot.png)

## License

This project is licensed under the MIT License. See the LICENSE file for details.


