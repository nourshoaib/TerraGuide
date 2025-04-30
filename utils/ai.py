import numpy as np
from tensorflow.keras.models import load_model

labels = ['apple', 'banana', 'blackgram', 'chickpea', 'coconut', 'coffee', 'cotton', 'grapes', 'jute', 'kidneybeans', 'lentil', 'maize', 'mango', 'mothbeans', 'mungbean', 'muskmelon', 'orange', 'papaya', 'pigeonpeas', 'pomegranate', 'rice', 'watermelon']

model = load_model('crop_model.h5')

def predict_crop(N, P, K, temperature, humidity, ph, rainfall):
    input_features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    prediction = model.predict(input_features)
    predicted_index = np.argmax(prediction)

    return labels[predicted_index]
