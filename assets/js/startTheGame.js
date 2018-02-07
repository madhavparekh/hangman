
const pizzaWords = ["pepperoni", "crust", "cheese", "slice", "olives", "sauce",
    "mushrooms", "salami", "pie", "pizza", "napoli", "italian", "italy", "sausage",
    "chicago", "combination","margherita", "new york", "stromboli", "calzone",
    "marinara","sicilian", "mama mia", "mozzarella", "chicago style"];

var wins = 0;
var loses = 0;
var disableInput = false;

//each game is an object
var hangManObj = {
    word: "",
    updatedJumble: "",
    guessesLeft: 8,
    correctGuesses: 0,
    wrongChar: "",
    guessedChar: "",
    
    //blank jumble to display
    blankJumble: function(){
        for(var i = 0; i < this.word.length; i++)
            this.updatedJumble += " _";
    },

    //checking and updating jumble if char is within word
    updateJumble: function(keyInput){
        var i = this.word.indexOf(keyInput);
        
        if(i !== -1){
            for(i; i < this.word.length; i++){
                if(this.word.charAt(i) === keyInput){
                    if(keyInput === " ")
                        keyInput = "_";
                    this.updatedJumble = this.updatedJumble.substring(0, ((i*2)+1))
                        + keyInput + this.updatedJumble.substring((i*2) + 2);
                    this.correctGuesses++;
                }
            }
            return true;
        }
        else{
            return false;
        }
    },

    //absolute matching word agains solved jumble
    checkIfSolved: function(){
        return this.word === this.updatedJumble.replace(/ /g, "").replace(/_/g, " ");
    }
};

function onButtonClick(){
    
    //enabling input
    disableInput = false;

    document.getElementById("dispJumble").textContent = " ";
    document.getElementById("wrongChar").textContent = " ";
    document.getElementById("guessesLeft").textContent = "8";
    document.getElementById("hangManPic").src = "assets/images/hm1.png";
    
    //picking a random word from list of array
    var picNextWord = pizzaWords[(Math.floor(Math.random() * (pizzaWords.length - 1)))].toUpperCase();
    
    console.log("Picked Word: " + picNextWord);

    //creating new hangManObj
    var nextWord = Object.create(hangManObj);
    //assigning word in obj
    nextWord.word = picNextWord;
    console.log("Word set to: " + nextWord.word);
    
    //creating new jumble with dashes
    nextWord.blankJumble();
    
    document.getElementById("dispJumble").textContent = nextWord.updatedJumble;

    //start of image display 
    document.getElementById("hangManPic").src = "assets/images/hm1.png"; 

    document.onkeyup = function(event){

        if(!disableInput){
            if(event.keyCode > 64 && event.keyCode < 91 || event.keyCode === 32){
                var pressedKey = String.fromCharCode(event.which).toUpperCase();

                //check if char was already gusessed
                if(nextWord.guessedChar.indexOf(pressedKey) !== -1){
                    alert('"' +pressedKey + ' already been entered. Try another character');
                }
                else{
                    //enter char into guessedChar
                    nextWord.guessedChar += pressedKey;

                    //check if char in word
                    if(nextWord.updateJumble(pressedKey)){
                        document.getElementById("correct").play();
                        document.getElementById("dispJumble").textContent = nextWord.updatedJumble;
                    }    
                    else{
                        
                        document.getElementById("wrong").play();
                        nextWord.wrongChar += pressedKey;
                        document.getElementById("wrongChar").textContent = nextWord.wrongChar;
                        nextWord.wrongChar += ", ";
                        document.getElementById("guessesLeft").textContent = --nextWord.guessesLeft;
                        //updating hangman pic
                        document.getElementById("hangManPic").src = "assets/images/hm" + (9 - nextWord.guessesLeft) + ".png";
                    }

                    console.log("lenght of nextWord.currectGuesses :" +nextWord.correctGuesses );

                    if(nextWord.correctGuesses === nextWord.word.length){
                        //On winning play music and display GIF
                        if(nextWord.checkIfSolved()){
                            document.getElementById("winner").play();
                            console.log("Yay Solved!");
                            document.getElementById("hangManPic").src = "assets/images/win.gif";
                            document.getElementById("wins").textContent = ++wins;
                            document.getElementById("startGame").textContent = "Play Again";
                            document.getElementById("startGame").disabled = false;
                        }
                        //disableling keyboard
                        disableInput = true;
                        
                    } else if(nextWord.guessesLeft < 1) {
                        //On losing play music and display GIF
                        document.getElementById("loser").play();
                        console.log("Not Solved!");
                        document.getElementById("hangManPic").src = "assets/images/lose.gif";
                        document.getElementById("loses").textContent = ++loses;
                        document.getElementById("startGame").textContent = "Play Again";
                        document.getElementById("startGame").disabled = false;
                        //disableling keyboard
                        disableInput = true;
                    }
                }
            }
            else{
                alert('Enter keys between "a" thru "z" OR SPACE only');
            }
        }
        else{
            alert("Click Play Again to play another game!");        
        }
        
    }
}