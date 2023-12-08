var divQuestion = document.getElementById("div-question");
if (divQuestion) {
  divQuestion.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {

  // Select the button with the ID 'rose-button'
  var GPTButton = document.getElementById("GPT");

  // Check if the button exists to avoid errors
  if (GPTButton) {
    // Add a click event listener to the button
    GPTButton.addEventListener('click', function () {
      // Select the element with the ID 'div-question'
      var divQuestion = document.getElementById('div-question');

      // Check if the element exists to avoid errors
      if (divQuestion) {
        // Set the display property to 'block' or another appropriate value
        divQuestion.style.display = 'block';
      }
    });
  }



  // Select the button with the ID 'rose-button'
  var Word2Vec_Button = document.getElementById("Word2Vec");

  // Check if the button exists to avoid errors
  if (Word2Vec_Button) {
    // Add a click event listener to the button
    Word2Vec_Button.addEventListener('click', function () {
      // Select the element with the ID 'div-question'
      var divQuestion = document.getElementById('div-question');

      // Check if the element exists to avoid errors
      if (divQuestion) {
        // Set the display property to 'block' or another appropriate value
        divQuestion.style.display = 'none';
      }
    });
  }




  // Select the button with the ID 'rose-button'
  var Regresson_Button = document.getElementById("Regresson");

  // Check if the button exists to avoid errors
  if (Regresson_Button) {
    // Add a click event listener to the button
    Regresson_Button.addEventListener('click', function () {
      // Select the element with the ID 'div-question'
      var divQuestion = document.getElementById('div-question');

      // Check if the element exists to avoid errors
      if (divQuestion) {
        // Set the display property to 'block' or another appropriate value
        divQuestion.style.display = 'none';
      }
    });
  }
});

document.getElementById('grading-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var referenceAnswer = document.getElementById('reference-answer').value;
  var studentAnswer = document.getElementById('student-answer').value;
  var question = document.getElementById('question').value;

  if (!referenceAnswer || !studentAnswer) {
    console.error('Error: One or both answers are null');
    return;
  }

  if (document.getElementById('Word2Vec').checked) {
    console.log("Word2Vec!");
    // Example: POST request to your Flask API
    fetch('http://127.0.0.1:7700/W2V_grade', {
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
    console.log("Regresson!");
    // Example: POST request to your Flask API
    fetch('http://127.0.0.1:7700/reference_grade', {
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
    console.log("GPT!");
    // Example: POST request to your Flask API
    fetch('http://127.0.0.1:7700/gpt_grade', {
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

// // Wait for the entire HTML document to load before executing the function
// document.addEventListener("DOMContentLoaded", function() {

//   // Once the document is fully loaded, log "ready!" to the console
//   console.log("ready!");

//   // Select the element with the ID 'div-question' and hide it by setting its display style to 'none'
//   var divQuestion = document.getElementById("div-question");
//   if (divQuestion) {
//       divQuestion.style.display = 'none';
//   }

//   // Call the 'init()' function, assuming it is defined elsewhere in your script
//   // This function is for tasks that should occur after the document is fully loaded
//   // init();
// });

