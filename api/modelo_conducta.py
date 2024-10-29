from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import LogisticRegression
from datasets import load_dataset
import pandas as pd
import joblib
import numpy as np

# Función para definir etiquetas manualmente (para propósitos de prueba)
def define_labels(index):
    labels = {
        0: ['depression', 'anxiety'],
        1: ['anxiety', 'stress'],
        2: ['depression'],
        3: ['stress'],
        4: ['depression', 'anxiety', 'stress']
    }
    return labels.get(index, [])

# Cargar y preparar datos
ds = load_dataset("Intuit-GenSRF/es_mental_health_counseling")
train_data = ds['train']
data = pd.DataFrame(train_data)

# Filtrar valores None en la columna 'Response'
data = data[data['Response'].notna()]

# Definir etiquetas manualmente
X = data['text_spanish'].values
y = [define_labels(i) for i in range(len(X))]

# Verificar las etiquetas
print("Etiquetas de ejemplo:")
print(y[:5])

# Codificar etiquetas
mlb = MultiLabelBinarizer()
y = mlb.fit_transform(y)

# Vectorizar texto
vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X)

# Definir el modelo
modelo = OneVsRestClassifier(LogisticRegression(max_iter=1000))

# Validación cruzada
scores = cross_val_score(modelo, X_vectorized, y, cv=5, scoring='accuracy')

# Imprimir los resultados de la validación cruzada
print(f"Cross-validation scores: {scores}")
print(f"Mean accuracy: {np.mean(scores)}")

# Entrenar el modelo final en todos los datos
modelo.fit(X_vectorized, y)

# Guardar modelo y objetos
joblib.dump(modelo, 'modelo.pkl')
joblib.dump(mlb, 'label_encoder.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')
joblib.dump(ds, 'dataset.pkl')
import shutil
shutil.move('dataset.pkl', 'api')
