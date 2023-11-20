import streamlit as st
import gensim
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Load your pre-trained word2vec model
model = gensim.models.Word2Vec.load("Models/word2vec_model.model")

def compute_sentence_vector(sentence):
    vectors = [model.wv[word] for word in sentence if word in model.wv]
    if vectors:
        return np.mean(vectors, axis=0)
    else:
        return np.zeros(model.vector_size)

def calculate_cosine_similarity(vec1, vec2):
    return cosine_similarity([vec1, vec2])[0, 1]

def calculate_grade(similarity, max_grade):
    if similarity >= 0.60:
        return max_grade
    elif similarity >= 0.50:
        return max_grade / 2
    elif similarity >= 0.25:
        return max_grade / 4
    else:
        return 0

# Streamlit app
st.title("Short Answer Grading App")

# Text inputs for reference answer, student answer, and maximum grade
ref_answer = st.text_area("Reference Answer")
student_answer = st.text_area("Student Answer")
max_grade = st.number_input("Maximum Grade", min_value=1, value=10)  # Default max grade is 10

if st.button("Grade Answer"):
    if ref_answer and student_answer and max_grade > 0:
        # Tokenize and preprocess the answers
        ref_answer_vector = compute_sentence_vector(ref_answer.split())
        student_answer_vector = compute_sentence_vector(student_answer.split())

        # Calculate cosine similarity
        similarity = calculate_cosine_similarity(ref_answer_vector, student_answer_vector)

        # Calculate the grade
        grade = calculate_grade(similarity, max_grade)
        st.write(f"Grade: {grade}/{max_grade} (Similarity: {similarity:.2f})")
    else:
        st.error("Please enter both a reference answer and a student answer, and set a maximum grade.")
