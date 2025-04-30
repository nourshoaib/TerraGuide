import os
import requests
from dotenv import load_dotenv

load_dotenv()  # Load from .env

api_key = os.getenv("OPENWEATHER_API_KEY")

def get_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()

    if "main" not in data:
        raise ValueError(f"Error fetching weather data: {data.get('message', 'Unknown error')}")

    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]
    weather_description = data["weather"][0]["description"]

    return {
        "temperature": temperature,
        "humidity": humidity,
        "description": weather_description
    }
