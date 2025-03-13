
# Sentiment Analysis App

This project is a sentiment analysis application built using Python and Flask for the backend and Next.js for the frontend. It analyzes text input or CSV files to predict sentiment (positive, negative, or neutral) and provides a distribution of sentiments. The backend uses a pre-trained machine learning model with a TF-IDF vectorizer, while the frontend offers an interactive UI for users to input text or upload CSV files.

## Features

- Predict sentiment from text data
- Handle CSV file uploads with text data
- Provide sentiment distribution
- Generate a bar graph of sentiment distribution

## Directory Structure
```
Sentiment-Analysis/
├── .vercel/                    # Configuration files for Vercel deployment
├── gradient-ui/                # Frontend code built with Next.js
├── static/                     # Static files (e.g., images, CSS)
├── templates/                  # HTML templates for Flask
├── venv/                       # Python virtual environment
├── .gitattributes              # Git attributes configuration
├── .gitignore                  # Specifies files to be ignored by Git
├── README.md                   # Project documentation
├── Sentiment_analysis.ipynb    # Jupyter Notebook for sentiment analysis
├── app.py                      # Flask application entry point
├── model_info.txt              # Information about the sentiment model
├── requirements.txt            # Python dependencies
└── sentiment_model.joblib      # Serialized sentiment analysis model
```

```
Sentiment-Analysis/gradient-ui/
├── public/                     # Static assets like images, fonts, etc.
├── src/
│   ├── components/             # Reusable React components
│   ├── pages/                  # Page components corresponding to routes
│   ├── styles/                 # CSS or SCSS files for styling
│   ├── utils/                  # Utility functions and helpers
│   └── ...                     # Other directories as needed
├── .gitignore                  # Specifies files to be ignored by Git
├── package.json                # NPM dependencies and scripts
├── README.md                   # Documentation specific to the frontend
└── next.config.js              # Next.js configuration file
```

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

## UI

### Home Page
![Home Page](path/to/home_page_screenshot.png)

### Prediction Page
![Prediction Page](path/to/prediction_page_screenshot.png)

## License

This project is licensed under the MIT License. See the LICENSE file for details.


