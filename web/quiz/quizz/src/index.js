let fetchlink = 'http://courselab.lnu.se/question/1';
let correctAnswer = '';
let questionNo = 0;
let interval;
let usedTime = 0
let timer = 10
let countdown;
let totalScore=0
/*

 */

function multiple(data) {
  document.getElementById('userAnswer').style.display = 'none';
  document.getElementById('alt4').style.display = 'inline';
  document.getElementById('4').style.display = 'inline';
  document.getElementById('buttons').style.display = 'inline';
  document.getElementById('submit').style.visibility = 'hidden';
  document.getElementById('submitOption').style.display = 'inline';
  document.getElementById('next').disabled = true;
  document.getElementById('alt1').innerHTML = data['alternatives']['alt1'];
  document.getElementById('alt2').innerHTML = data['alternatives']['alt2'];
  document.getElementById('alt3').innerHTML = data['alternatives']['alt3'];
  document.getElementById('alt4').innerHTML = data['alternatives']['alt4'];
  if (document.getElementById('alt4').innerHTML === 'undefined') {
    document.getElementById('alt4').style.display = 'none';
    document.getElementById('4').style.display = 'none';
  }
  document.getElementById('printmsg').innerHTML = '';
}

function formatOpenAnswer() {
  document.getElementById('submit').style.visibility = 'visible';
  document.getElementById('buttons').style.display = 'none';
  document.getElementById('submit').disabled = false;
  document.getElementById('userAnswer').style.display = 'inline';
  document.getElementById('next').disabled = true;
  document.getElementById('submitOption').style.display = 'none';
  document.getElementById('printmsg').innerHTML = '';
}



function getNextQuestion() {
  fetch(fetchlink).then((Response) => {
    Response.json().then(function (data) {
      if (data.hasOwnProperty('alternatives')) {
        multiple(data);
      } else {
        formatOpenAnswer();
      }
      startTimer(timer, document.querySelector('#seconds'))
      console.log(data);
      console.log('Answer: ' + data.answer);
      console.log(JSON.stringify(data, null, 4));
      fetchlink = data['nextURL'];
      document.getElementById('questions').innerHTML =
        'Question ' + data.id + ': ' + data.question;
      questionNo++;
    });

  });
}

function option() {
  document.getElementById('submitOption').disabled = false;
}

function sendAlternative() {
  stopTimer();
  document.getElementById('submitOption').disabled = true;
  let finalAnswer = '';
  for (let i = 1; i <= 5; i++) {
    let radio = document.getElementById(i.toString());
    if (radio.checked) {
      finalAnswer = i.toString();
      break;
    }
  }
  let userChoice = 'alt' + finalAnswer;
  let data = { answer: userChoice };
  console.log(data);
  fetch(fetchlink, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((Response) => {
    Response.json().then(function (data) {
      if (Response.status !== 200) {
        console.log('An Error Occurred! Error Code: ' + Response.status);
        console.log(data);
        lost()
        document.getElementById('printmsg').style.color = 'red';
        document.getElementById('printmsg').innerHTML = data.message;
      } else {
        document.getElementById('printmsg').style.color = 'green';
        document.getElementById('printmsg').innerHTML = data.message;
        document.getElementById('next').disabled = false;
        console.log(data);
        if (data.hasOwnProperty('nextURL')) {
          fetchlink = data['nextURL'];
          console.log('Next Question Link: ' + fetchlink);
        } else {
          win();
        }
      }
    });
  });
  for (let i = 1; i < 5; i++) {
    document.getElementById(i.toString()).checked = false;
  }
}

function sendAnswer() {
  stopTimer();
  correctAnswer = document.getElementById('userAnswer').value;
  let data = { answer: correctAnswer.toString() };
  console.log(data);
  sendData(data);
}

function sendData(data) {
  fetch(fetchlink, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((Response) => {
    Response.json().then(function (data) {
      if (Response.status !== 200) {
        document.getElementById('printmsg').style.color = 'red';
        document.getElementById('printmsg').innerHTML = data.message;
        console.log('An Error Occurred! Error Code: ' + Response.status);
        console.log(data);
        lost()
      } else {
        document.getElementById('printmsg').style.color = 'green';
        document.getElementById('printmsg').innerHTML = data.message;
        document.getElementById('next').disabled = false;
        document.getElementById('submit').disabled = true;
        document.getElementById('submitOption').disabled = true;
        console.log(data);
        fetchlink = data['nextURL'];
        console.log('Next Question Link: ' + fetchlink);
      }
    });
  });
}


function startTimer (duration, display) {
   countdown = duration
  interval = setInterval(() => {
    display.textContent = countdown
    //document.getElementById("progressBar").value = 10 - countdown;
    if (--countdown < 0) {
      lost()
    }
  }, 1000)
}

function stopTimer () {
  clearInterval(interval)
  usedTime += timer - countdown
  totalScore++
  console.log(" Score "+totalScore)
  console.log("Hello i am time used  "+ usedTime)

}



function displayHighScores(){
  document.getElementById('high-score').style.visibility = 'visible';
  let players = JSON.parse(window.localStorage.getItem('players')) === null ? [] : JSON.parse(window.localStorage.getItem('players'))
  players.push({ name: username, score:usedTime, totalScore})
  players.sort((p1, p2) => { return p1.score - p2.score })
  players.splice(5, 1)
  let elements = document.querySelectorAll('#high-score ol li')
  players.forEach((player, index) => { elements[index].textContent = player.name + ': ' +"Your Score is :"+ player.score + ' Seconds' })
  document.querySelector('#high-score').classList.remove('is-hide')
  window.localStorage.setItem('players', JSON.stringify(players))
}
