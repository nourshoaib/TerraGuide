from flask import Flask, render_template, request, jsonify
from utils.weather import get_weather
from utils.ai import predict_crop

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()
        ph = float(data.get("ph", 7.0))
        N = float(data.get("N", 90))
        P = float(data.get("P", 42))
        K = float(data.get("K", 43))
        rainfall = float(data.get("rainfall", 100))
        city = data.get("city", "London")

        # Get weather data
        weather_data = get_weather(city)
        print("Weather Data:", weather_data)

        temperature = weather_data.get("temperature")
        humidity = weather_data.get("humidity")

        if temperature is None or humidity is None:
            return jsonify({"error": "Missing temperature or humidity from weather data"}), 500

        print("Temperature:", temperature)
        print("Humidity:", humidity)

        # Predict crop
        crop = predict_crop(N, P, K, temperature, humidity, ph, rainfall)

        return jsonify({"crop": crop, "temperature": temperature})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
