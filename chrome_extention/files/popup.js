document.getElementById('grading-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const referenceAnswer = document.getElementById('reference-answer').value;
    const studentAnswer = document.getElementById('student-answer').value;
  
    // Example: POST request to your Flask API
    fetch('http://127.0.0.1:5000/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reference_answer: referenceAnswer, student_answer: studentAnswer })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('result').innerText = `Predicted Grade: ${data.predicted_grade}`;
    })
    .catch(error => console.error('Error:', error));
  });
  