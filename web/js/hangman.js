
window.onload = function () {

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let categories;         // Array of topics
    let word;              // Selected word
    let guess;             // Guesses
    let guesses = [];      // Stored guesses
    let lives = 6;         // Lives
    let counter;           // Count correct guesses
    let space;              // Number of spaces in word '-'
    let myButtons;
    let letters;
    let list;
    let correct;


    // Get elements
    const showLives = document.getElementById("mylives");
    let showImage=document.createElement('img');
    let addHere= document.getElementById('hangmanPic');
    showImage.setAttribute('src', '../img/hang0.png');
    document.getElementById("hangmanPic").style.height = "red";
    addHere.append(showImage);


    // create alphabet ul
    const buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');
        for (let i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    };


    // Create guesses
    function result() {
       let wordHolder = document.getElementById('hold');
           correct = document.createElement('ul');
        for (let i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 4;
            } else {
                guess.innerHTML = "_";
            }
            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }


    // Show lives
    function comments() {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            document.getElementById('buttons').style.visibility = "hidden";
            showLives.innerHTML = "Game Over! the country was  " + word.toUpperCase();
            showImage.setAttribute('src', '../img/hangdead.png');
            addHere.append(showImage)
        }
        if(lives === 5 ){
            showImage.setAttribute('src', '../img/hang1.png');
            addHere.append(showImage)
        }
        if(lives === 4 ){
            showImage.setAttribute('src', '../img/hang2.png');
            addHere.append(showImage)
        }
        if(lives === 3 ){
            showImage.setAttribute('src', '../img/hang3.png');
            addHere.append(showImage)
        }
        if(lives === 2 ){
            showImage.setAttribute('src', '../img/hang4.png');
            addHere.append(showImage)
        }
        if(lives === 1 ){
            showImage.setAttribute('src', '../img/hang5.png');
            addHere.append(showImage)
        }
        for (let i = 0; i < guesses.length; i++) {
            if (counter + space === guesses.length) {
                document.getElementById('buttons').style.visibility = "hidden";
                showLives.innerHTML = "You Win!";
                showImage.setAttribute('src', '../img/hangmanThanks.png');
                addHere.append(showImage)
            }
        }
    }


    // OnClick Function
    function check() {
        list.onclick = function () {
            const guess = (this.innerHTML);
            this.setAttribute("class", "active");
           // this.onclick = null;
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    guesses[i].innerHTML = guess;
                    counter += 1;
                }
            }
            const j = (word.indexOf(guess));
            if (j === -1) {
                lives -= 1;
                comments();
                //animate();
            } else {
                comments();
            }
        }
    }


    // select random and play
    function start() {
        categories = [
            "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antarctica", "Argentina",
            "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
            "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Botswana", "Brazil",
            "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
            "Cayman Islands", "Chad", "Chile", "China", "Christmas Island","Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus",
            "Denmark", "Djibouti", "Dominica", "Ecuador", "Egypt", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland",
            "France", "Gabon", "Georgia", "Germany", "Ghana", "Gibraltar",
            "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea",
            "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
            "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
            "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
            "Macau", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
            "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova",
            "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia",
            "Nauru", "Nepal", "Netherlands", "Nicaragua", "Niger", "Nigeria", "Niue",
            "Norway", "Oman", "Pakistan", "Palau", "Panama","Paraguay", "Peru", "Philippines", "Poland", "Portugal","Qatar",
            "Reunion", "Romania", "Russia", "Rwanda", "Samoa", "Senegal", "Seychelles","Singapore", "Slovakia", "Slovenia", "Somalia",
            "Spain","Sudan", "Suriname","Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
            "The Gambia", "Togo", "Tokelau", "Tonga","Tunisia", "Turkey", "Turkmenistan", "Tuvalu","Uganda", "Ukraine", "USA","Uruguay", "Uzbekistan",
            "Vanuatu","Venezuela", "Vietnam", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"
        ];
        word = categories[Math.floor(Math.random() * categories.length)].toLowerCase();
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();
        guesses = [ ];
        counter = 0;
        space = 0;
        result();
        comments();
    }
    start();

    // Reset
    document.getElementById('reset').onclick = function() {
        document.getElementById('buttons').style.visibility = "visible";
        showImage.remove()
        showLives.remove()
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        start();
    }
}
