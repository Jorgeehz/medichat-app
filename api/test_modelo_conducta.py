from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Crear la aplicación Flask
app = Flask(__name__)

# Cargar el modelo y los objetos necesarios
vectorizer = joblib.load('vectorizer.pkl')

# Cargar el dataset original para buscar respuestas
ds = joblib.load('dataset.pkl')  # Asegúrate de tener el dataset guardado como 'dataset.pkl'
data = pd.DataFrame(ds['train'])

# Vectorizar los textos del dataset
X_vectorized = vectorizer.fit_transform(data['text_spanish'])

@app.route('/predict', methods=['POST'])
def predict():
    # Obtener los datos de la petición POST
    request_data = request.json
    text = request_data.get('text', '')

    # Vectorizar el texto de entrada
    text_vectorized = vectorizer.transform([text])
    print(f"Vectorized text: {text_vectorized}")

    # Calcular la similitud del coseno
    similarities = cosine_similarity(text_vectorized, X_vectorized)
    print(f"Similarities: {similarities}")

    # Obtener los índices de los textos más similares
    similar_indices = similarities.argsort()[0][-5:][::-1]
    print(f"Similar indices: {similar_indices}")

    # Obtener las respuestas correspondientes
    responses = data['Response'].iloc[similar_indices].tolist()
    print(f"Responses: {responses}")

    # Devolver la respuesta en formato JSON
    return jsonify({'responses': responses})

if __name__ == '__main__':
    app.run(debug=True)