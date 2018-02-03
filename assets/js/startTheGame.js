
const pizzaWords = ["pepperoni", "crust", "cheese", "slice", "olives", "sauce",
    "mushrooms", "salami", "pie", "pizza", "napoli", "italian", "italy", "sausage",
    "chicago", "combination","margherita", "new york", "stromboli", "calzone",
    "marinara","sicilian", "mama mia", "mozzarella", "chicago style"];

var wins = 0;
var loses = 0;

var hangManObj = {
    word: "",
    updatedJumble: "",
    guessesLeft: 8,
    correctGuesses: 0,
    wrongChar: "",
    guessedChar: "",

    blankJumble: function(){
        for(var i = 0; i < this.word.length; i++)
            this.updatedJumble += " _";
    },

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

    checkIfSolved: function(){
        return this.word === this.updatedJumble.replace(/ /g, "").replace(/_/g, " ");
    }
};

function onButtonClick(){
    
    document.getElementById("startGame").disabled = true;
    enableKeyBoard();

    document.getElementById("dispJumble").textContent = " ";
    document.getElementById("wrongChar").textContent = " ";
    document.getElementById("guessesLeft").textContent = "8";
    document.getElementById("hangManPic").src = "assets/images/hm1.png";
    
    var picNextWord = pizzaWords[(Math.floor(Math.random() * (pizzaWords.length - 1)))].toUpperCase();
    //picNextWord = "new york".toUpperCase();
    
    console.log("Picked Word: " + picNextWord);

    //creating new hangManObj
    var nextWord = Object.create(hangManObj);
    //assigning word in obj
    nextWord.word = picNextWord;
    console.log("Word set to: " + nextWord.word);
    
    //creating new jumble
    nextWord.blankJumble();
    
    document.getElementById("dispJumble").textContent = nextWord.updatedJumble;

    console.log("guesses left: " +nextWord.guessesLeft);

    document.onkeyup = function(event){
        var pressedKey = String.fromCharCode(event.which).toUpperCase();

        //check if char was already gusessed
        if(nextWord.guessedChar.indexOf(pressedKey) !== -1){
            alert('"' +pressedKey + ' already been entered. Try another character');
        }
        else{
            //enter char into guessedChar
            nextWord.guessedChar += pressedKey;

            //check if char in word
            if(nextWord.updateJumble(pressedKey))
                document.getElementById("dispJumble").textContent = nextWord.updatedJumble;
                
            else{
                nextWord.wrongChar += pressedKey;
                document.getElementById("wrongChar").textContent = nextWord.wrongChar;
                nextWord.wrongChar += ", ";
                document.getElementById("guessesLeft").textContent = --nextWord.guessesLeft;
                document.getElementById("hangManPic").src = "assets/images/hm" + (9 - nextWord.guessesLeft) + ".png";
            }

            console.log("lenght of nextWord.currectGuesses :" +nextWord.correctGuesses );

            if(nextWord.correctGuesses === nextWord.word.length){
                if(nextWord.checkIfSolved()){
                    console.log("Yay Solved!");
                    document.getElementById("hangManPic").src = "assets/images/win.gif";
                    document.getElementById("winner").play();
                    document.getElementById("wins").textContent = ++wins;
                    document.getElementById("startGame").textContent = "Play Again";
                    document.getElementById("startGame").disabled = false;
                }
                //disableling keyboard
                disableKeyBoard();
                
            } else if(nextWord.guessesLeft < 1) {
                console.log("Not Solved!");
                document.getElementById("hangManPic").src = "assets/images/lose.gif";
                document.getElementById("loser").play();
                document.getElementById("loses").textContent = ++loses;
                document.getElementById("startGame").textContent = "Play Again";
                document.getElementById("startGame").disabled = false;
                //disableling keyboard
                disableKeyBoard();
            }
            
        }
    }
}

function disableKeyBoard(){
    document.onkeydown = function (e){
        alert("Click Play Again to play another game!");
        return false;
    }
}

function enableKeyBoard(){
    document.onkeydown = function (e){
        //alert("Click Play Again to play another game!");
        return true;
    }
}