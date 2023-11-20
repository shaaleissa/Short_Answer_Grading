import streamlit as st
import gensim
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib  # For loading the trained model

# Load pre-trained word2vec and regressor models
word2vec_model = gensim.models.Word2Vec.load("Models/word2vec_model.model")
regressor_model = joblib.load("Models/regressor.joblib")

def compute_sentence_vector(sentence, model):
    vectors = [model.wv[word] for word in sentence.split() if word in model.wv]
    if vectors:
        return np.mean(vectors, axis=0)
    else:
        return np.zeros(model.vector_size)

def predict_grade(ref_answer, student_answer, word2vec_model, regressor_model):
    ref_vector = compute_sentence_vector(ref_answer, word2vec_model)
    student_vector = compute_sentence_vector(student_answer, word2vec_model)
    combined_vector = np.concatenate([ref_vector, student_vector])
    predicted_grade = regressor_model.predict([combined_vector])[0]
    return predicted_grade

# Streamlit app
st.title("Short Answer Grading App with Regression Model")

# Text inputs for reference answer and student answer
ref_answer = st.text_area("Reference Answer")
student_answer = st.text_area("Student Answer")

if st.button("Predict Grade"):
    if ref_answer and student_answer:
        # Predict the grade
        predicted_grade = predict_grade(ref_answer, student_answer, word2vec_model, regressor_model)
        st.write(f"Predicted Grade: {predicted_grade:.2f}")
    else:
        st.error("Please enter both a reference answer and a student answer.")
