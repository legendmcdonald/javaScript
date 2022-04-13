let username = '';

function user() {
  document.getElementById('user').innerHTML = 'Choose a nickname?';
  document.getElementById('start').style.visibility = 'visible';
  document.getElementById('buttons').style.visibility = 'hidden';
  document.getElementById('submitOption').style.visibility = 'hidden';
  document.getElementById('next').style.visibility = 'hidden';
  document.getElementById('submit').style.visibility = 'hidden';
  document.getElementById('userAnswer').style.visibility = 'hidden';
  document.getElementById('progressBar').style.visibility = 'hidden';
  document.getElementById('high-score').style.visibility = 'hidden';
}

function getName() {
  username = document.getElementById('username').value.toUpperCase();
  document.getElementById('name').innerHTML = 'Hello: ' + username;
}

function play() {
  getName();
  document.getElementById('buttons').style.visibility = 'visible';
  document.getElementById('submitOption').style.visibility = 'visible';
  document.getElementById('next').style.visibility = 'visible';
  document.getElementById('submit').style.visibility = 'visible';
  document.getElementById('userAnswer').style.visibility = 'visible';
  document.getElementById('progressBar').style.visibility = 'visible';
  userName = document.getElementById('username').value;
  document.getElementById('high-score').style.visibility = 'hidden';
  getNextQuestion();
  document.getElementById('user').remove();
  document.getElementById('username').remove();
  document.getElementById('start').remove();
}

function lost() {
  displayHighScores()
  document.getElementById('questionHolder').remove();
  document.getElementById('wrong').innerHTML = username + ' Wrong Answer Better Luck Next Time';
  clearInterval(timer);
  stopTimer();
}

function win() {
  document.getElementById('questionHolder').remove();
  document.getElementById('questions').innerHTML =
    'Congratulations ' + username + '! You finished your task! '; // + time + " seconds!";
  clearInterval(timer);
  stopTimer();
  displayHighScores()
}


