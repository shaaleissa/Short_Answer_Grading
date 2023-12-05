from flask import Flask, request, jsonify
import gensim
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
import joblib


app = Flask(__name__)
CORS(app)

model = gensim.models.Word2Vec.load("Short_Answer_Grading/Models/word2vec_model.model")

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
    
@app.route('/W2V_grade', methods=['POST'])
def W2V_grade():
    # Extract data from request
    data = request.json
    reference_answer = data['reference_answer']
    student_answer = data['student_answer']
    max_grade=5
    
    ref_answer_vector = compute_sentence_vector(reference_answer.split())
    student_answer_vector = compute_sentence_vector(student_answer.split())

    similarity = calculate_cosine_similarity(ref_answer_vector, student_answer_vector)

    # Calculate the grade
    grade = calculate_grade(similarity, max_grade)


    return jsonify({
        'reference_answer': reference_answer,
        'student_answer': student_answer,
        'predicted_grade': grade
    })

# def predict_grade(ref_answer, student_answer):
#     ref_vector = compute_sentence_vector(ref_answer)
#     student_vector = compute_sentence_vector(student_answer)
#     combined_vector = np.concatenate([ref_vector, student_vector])
#     predicted_grade = regressor_model.predict([combined_vector])[0]
#     return predicted_grade

# Load pre-trained word2vec and regressor models
regressor_model = joblib.load("Short_Answer_Grading/Models/regressor.joblib")

@app.route('/reference_grade', methods=['POST'])
def reference_grade():
    # Extract data from request
    data = request.json
    reference_answer = data['reference_answer']
    student_answer = data['student_answer']
    
    
    ref_answer_vector = compute_sentence_vector(reference_answer.split())
    student_answer_vector = compute_sentence_vector(student_answer.split())
    
    combined_vector = np.concatenate([ref_answer_vector, student_answer_vector])
    
    # Calculate the grade
    predicted_grade = regressor_model.predict([combined_vector])[0]
    
    return jsonify({
        'reference_answer': reference_answer,
        'student_answer': student_answer,
        'predicted_grade': predicted_grade
    })


if __name__ == '__main__':
    app.run(debug=True)
