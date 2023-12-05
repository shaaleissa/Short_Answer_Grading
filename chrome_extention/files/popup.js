document.getElementById('grading-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var referenceAnswer = document.getElementById('reference-answer').value;
    var studentAnswer = document.getElementById('student-answer').value;
    var question = document.getElementById('question').value;
  
    if (!referenceAnswer || !studentAnswer) {
      console.error('Error: One or both answers are null');
      return;
    }
    
    if (document.getElementById('Word2Vec').checked) {
      // Example: POST request to your Flask API
    fetch('http://127.0.0.1:5000/W2V_grade', {
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
  }
  else if (document.getElementById('Regresson').checked) {
      // Example: POST request to your Flask API
      fetch('http://127.0.0.1:5000/reference_grade', {
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
  }
  else if (document.getElementById('GPT').checked) {
    // Example: POST request to your Flask API
    fetch('http://127.0.0.1:5000/gpt_grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: question, reference_answer: referenceAnswer, student_answer: studentAnswer })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('result').innerText = `Predicted Grade: ${data.predicted_grade}`;
      
    })
    .catch(error => console.error('Error:', error));
}
  
});

