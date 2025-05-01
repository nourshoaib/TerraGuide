# 🌱 TerraGuide

TerraGuide is an AI-powered farming assistant that recommends the most suitable crop to grow based on soil and weather conditions. This project was built for Apex Hacks I and aligns with the UN Sustainable Development Goals.

## 🚀 Features

- 🌡️ Real-time weather integration
- 📊 AI-powered crop prediction
- 🌍 User-friendly web interface
- 📦 Built with Flask and TensorFlow

## 🔧 Technologies & Resources Used

### Core Technologies
- Python & Flask
- TensorFlow (Keras)
- HTML, CSS, JavaScript

### External APIs
- [OpenWeatherMap API](https://openweathermap.org/api) - Provides real-time weather data
  - Used Endpoint: Current Weather Data (free tier)

### AI Model
- Pre-trained crop recommendation model (crop_model.h5)
  - Originally trained on [Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)
  - Input features: N, P, K, temperature, humidity, ph, rainfall
  - Output: 22 crop classes including rice, wheat, maize, etc.
## 📁 Project Structure

```
TerraGuide/
├── static/            # CSS and JS files
├── templates/         # HTML templates
├── utils/
│   ├── ai.py          # Crop prediction logic
│   └── weather.py     # Weather API integration
├── app.py             # Main Flask application
├── crop_model.h5      # Trained ML model
└── README.md          # Project documentation
```

## 🌐 How to Run

1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Add your OpenWeatherMap API key in `utils/weather.py`
4. Run the app: `python app.py`
5. Visit `http://localhost:5000`

## 🤖 Model Input Features

- N: Nitrogen content in soil
- P: Phosphorus content in soil
- K: Potassium content in soil
- Temperature
- Humidity
- pH value
- Rainfall

## 📬 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📜 License

TerraGuide is released under the [MIT License](LICENSE).
