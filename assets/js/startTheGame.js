
const pizzaWords = ["pepperoni", "crust", "cheese", "slice", "olives", "sauce",
    "mushrooms", "salami", "pie", "pizza", "napoli", "italian", "italy", "sausage",
    "chicago", "combination","margherita", "new york", "stromboli", "calzone",
    "marinara","sicilian"];

var wins = 0;
var loses = 0;

var hangManObj = {
    word: "",
    updatedJumble: "",
    guessesLeft: 8,
    correctGuesses: 0,
    wrongChar: "",
    spaceEntered: false,

    blankJumble: function(){
        for(var i = 0; i < this.word.length; i++)
            this.updatedJumble += " _";
    },

    updateJumble: function(keyInput){
        //check to see if player already entered keyInput before
        if(keyInput == " " && !this.spaceEntered){
            this.spaceEntered = true;
        }
        else if(this.updatedJumble.indexOf(keyInput) !== -1){
            alert("Already Entered. Enter another letter!");
            return true;
        }

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
        else if(this.wrongChar.indexOf(keyInput) !== -1){
            alert("Already Entered. Enter another letter!");
            return true;
        }
        else{
            return false;
        }
    },

    checkIfSolved: function(){
        this.updatedJumble.replace(/ /g, "");
        // tmp = tmp.replace(/_/g, " ");
        // console.log("checkIfSolved: word: " +this.word +" jumble: " +tmp);

        return this.word === this.updatedJumble.replace(/_/g, "");
    }
};

function onButtonClick(){
    
    document.getElementById("startGame").disabled = true;
    enableKeyBoard();

    document.getElementById("wrongChar").innerHTML = "";
    document.getElementById("guessesLeft").innerHTML = "";
    
    var picNextWord = pizzaWords[(Math.floor(Math.random() * (pizzaWords.length - 1)))].toUpperCase();
    picNextWord = "new york".toUpperCase();
    
    console.log("Picked Word: " + picNextWord);

    //creating new hangManObj
    var nextWord = Object.create(hangManObj);
    //assigning word in obj
    nextWord.word = picNextWord;
    console.log("Word set to: " + nextWord.word);
    
    //creating new jumble
    nextWord.blankJumble();
    
    document.getElementById("dispJumble").innerText = nextWord.updatedJumble;

    // var wrongChar = "";

    console.log("guesses left: " +nextWord.guessesLeft);

    
    document.onkeyup = function(event){
        var pressedKey = String.fromCharCode(event.which).toUpperCase();
        //check if char in word
        if(nextWord.updateJumble(pressedKey))
            document.getElementById("dispJumble").innerText = nextWord.updatedJumble;
        else{
            nextWord.wrongChar += pressedKey;
            document.getElementById("wrongChar").innerText = nextWord.wrongChar;
            nextWord.wrongChar += ", ";
            document.getElementById("guessesLeft").innerText = --nextWord.guessesLeft;
        }

        console.log("lenght of nextWord.currectGuesses :" +nextWord.correctGuesses );

        if(nextWord.correctGuesses === nextWord.word.length){
            if(nextWord.checkIfSolved()){
                console.log("Yay Solved!");
                document.getElementById("wins").innerText = ++wins;
                document.getElementById("startGame").innerText = "Play Again";
                document.getElementById("startGame").disabled = false;
            }
            //disableling keyboard
            disableKeyBoard();
            
        } else if(nextWord.guessesLeft < 1) {
            console.log("Not Solved!");
            document.getElementById("loses").innerText = ++loses;
            document.getElementById("startGame").innerText = "Play Again";
            document.getElementById("startGame").disabled = false;
            //disableling keyboard
            disableKeyBoard();
        }
    }
}

function disableKeyBoard(){
    document.onkeydown = function (e){
        alert("Click Play Again to play another game!")
        return false;
    }
}

function enableKeyBoard(){
    document.onkeydown = function (e){
        return true;
    }
}