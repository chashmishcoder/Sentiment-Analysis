
   # Sentiment Analysis Application

   ## Overview
   This project is a sentiment analysis application built using Python and Flask for the backend (`sentiment-analysis-app`) and Next.js for the frontend (`gradient-ui`). It analyzes text input or CSV files to predict sentiment (positive, negative, or neutral) and provides a distribution of sentiments. The backend uses a pre-trained machine learning model with a TF-IDF vectorizer, while the frontend offers an interactive UI for users to input text or upload CSV files.

   The application was initially developed with a nested structure but has been reorganized into two separate folders for better modularity and local development. This README focuses on the backend, but the frontend is also described for completeness.

   ## Features
   - Analyze single text inputs for sentiment.
   - Process multiple sentiments from CSV files with a "text" column.
   - Display sentiment predictions and distribution (positive, neutral, negative) in a visually appealing UI.
   - Local development support with environment variables for API URL configuration.

   ## Directory Structure
   The project is split into two main directories under `/Users/omkarthorve/Desktop/`:

   ### Backend (`sentiment-analysis-app`)
   ```
   sentiment-analysis-app/
   ├── .git/                # Git metadata for version control
   ├── .gitignore           # Excludes system files (e.g., .DS_Store) and frontend
   ├── app.py               # Main Flask application with API endpoints
   ├── sentiment_model.joblib  # Pre-trained sentiment analysis model
   ├── tfidf_vectorizer.joblib # Pre-trained TF-IDF vectorizer (reduced size)
   ├── requirements.txt      # Python dependencies
   ├── train_model.py       # Optional script to retrain the model (not deployed)
   └── README.md            # This file
   ```

   ### Frontend (`gradient-ui`)
   ```
   gradient-ui/
   ├── .git/                # Git metadata for version control
   ├── .gitignore           # Excludes .env.local, node_modules, .next
   ├── .env.local           # Local environment variable file (e.g., NEXT_PUBLIC_API_URL)
   ├── app/
   │   ├── page.tsx         # Main Next.js page with fetch logic
   │   └── layout.tsx       # Root layout file
   ├── components/          # Directory for UI components
   │   ├── ui/
   │   │   ├── button.tsx   # Button component
   │   │   ├── card.tsx     # Card component
   │   │   ├── tabs.tsx     # Tabs component
   │   │   └── textarea.tsx # Textarea component
   ├── public/              # Static assets (if any)
   ├── package.json         # Node.js dependencies and scripts
   └── README.md            # Frontend-specific README (optional)
   ```

   ## Prerequisites
   - **Python 3.12+** for the backend.
   - **Node.js 16.x or later** for the frontend.
   - A terminal and Git installed.

   ## Steps to Run Locally

   ### 1. Set Up the Backend
   - Navigate to the backend directory:
     ```bash
     cd /Users/omkarthorve/Desktop/sentiment-analysis-app
     ```
   - Create and activate a virtual environment:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Flask application:
     ```bash
     python app.py
     ```
   - The backend will start on `http://127.0.0.1:5001`. Leave it running.

   ### 2. Set Up the Frontend
   - Navigate to the frontend directory:
     ```bash
     cd /Users/omkarthorve/Desktop/gradient-ui
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env.local` file with the backend URL:
     ```bash
     echo "NEXT_PUBLIC_API_URL=http://127.0.0.1:5001/predict" > .env.local
     ```
   - Start the Next.js application:
     ```bash
     npm run dev
     ```
   - Open `http://localhost:3000` in your browser to access the UI.

   ### 3. Test the Application
   - In the UI, enter text (e.g., "I am sad today") or upload a CSV file with a "text" column.
   - Click "Submit" to see the sentiment prediction and distribution.

   ## Adding a UI Screenshot
   To showcase the application’s user interface:
   1. Run the frontend locally at `http://localhost:3000`.
   2. Take a screenshot of the UI (e.g., using Cmd + Shift + 4 on macOS).
   3. Save the screenshot as `ui-screenshot.png` in the `gradient-ui/public/` directory.
   4. Add the screenshot to this README by updating the following section with the relative path:
      ```markdown
      ## Screenshot
      ![Sentiment Analysis UI](gradient-ui/public/ui-screenshot.png)
      ```
   - Note: Since the backend and frontend are separate, the screenshot should be added to the `gradient-ui` repository’s `public/` folder, and you may want to include it in the `gradient-ui/README.md` as well. For this backend `README.md`, you can reference it with the relative path as shown above.

   ## Contributing
   - Feel free to fork this repository and submit pull requests for improvements.
   - Report issues or suggest features by opening an issue on GitHub.

   ## License
   [Add your license here, e.g., MIT] - If you don’t have one, consider adding a license like MIT for open-source projects.

   ## Acknowledgments
   - Built with Flask, Next.js, and scikit-learn.
   - Inspiration from sentiment analysis research and UI design trends.
   ```

---
