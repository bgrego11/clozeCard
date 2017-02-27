var inquirer = require('inquirer');
var fs = require("fs");

var Flash = function(q, a) {
    if (q !== "" && a !== "") {
    this.question = q;
    this.answer = a;
    this.valid = true;
}
else {
    this.valid = false;
    console.log("input values are invalid");
}
}

var ClozeCard = function(t, c) {
    if (t.includes(c)) {
        this.fullTxt = t;
        this.cloze = c;
    //placeholder for methods
        this.partial = this.fullTxt.replace(this.cloze,"...");
        this.valid = true;
           
        
    }
    else {
        this.valid = false;
        console.log("oops the cloze deletion text was not found in the full text provided")
    };  
}

var flashPrompt = function() {


    var questions = [{
        name: 'question',
        message: 'Enter the question for your flash card'
        }, {
        name: 'answer',
        message: 'Enter the answer to your flashcard',
    }]
    
    inquirer.prompt(questions).then(function(data) {
            card = new Flash(data.question,data.answer);
            if (card.valid) {
                appendData = "\nflash | "+card.question+" | "+card.answer;
                fs.appendFile("cards.txt",appendData);

            }
            
        
        
    });
}

var clozePrompt = function() {


    var questions = [{
        name: 'text',
        message: 'Enter the full text for your Cloze Card'
        }, {
        name: 'cloze',
        message: 'Enter the text to be used as the cloze (masked) value'
    }]
    
    inquirer.prompt(questions).then(function(data) {


        if (data.question !== "" && data.answer !== ""){
            card = new ClozeCard(data.text,data.cloze);
            if (card.valid) {
            appendData = "\ncloze | "+card.fullTxt+" | "+card.cloze;
            fs.appendFile("cards.txt",appendData)
            };
        }
        else {
            console.log("the card inputs were invalid")
        };
        
    });
}


var printAll = function() {
   fs.readFile("cards.txt","UTF-8",function (err,data) {
            if (err) {
                return console.log(err);
            }
            var myCards = [];
            
            var array = data.toString().split("\n")
            

            for (i in array) {
            cardArr = array[i].split("|");
            if (cardArr.length > 2) {
           
            //capture card type
            type = cardArr[0].trim();
            text1 = cardArr[1].trim();
            text2 = cardArr[2].trim();
            if (type === 'flash') {
                myCards.push(new Flash(text1,text2));
                
            } else if (type === "cloze") {
                myCards.push(new ClozeCard(text1,text2));
            };
            }
            


        }
        console.log(myCards);
            });
    }


var printFlash = function() {
   fs.readFile("cards.txt","UTF-8",function (err,data) {
            if (err) {
                return console.log(err);
            }
            var myCards = [];
            var array = data.toString().split("\n")

            for (i in array) {
            cardArr = array[i].split("|");
            if (cardArr.length > 2) {
            //capture card type
            type = cardArr[0].trim();
            text1 = cardArr[1].trim();
            text2 = cardArr[2].trim();
            if (type === 'flash') {
                myCards.push(new Flash(text1,text2));
                
            };
            };
            


        }
        console.log(myCards);
            });
    }

var printCloze = function() {
   fs.readFile("cards.txt","UTF-8",function (err,data) {
            if (err) {
                return console.log(err);
            }
            var myCards = [];
            var array = data.toString().split("\n")

            for (i in array) {
            cardArr = array[i].split("|");
            if (cardArr.length > 2) {
            //capture card type
            type = cardArr[0].trim();
            text1 = cardArr[1].trim();
            text2 = cardArr[2].trim();
           if (type === "cloze") {
                myCards.push(new ClozeCard(text1,text2));
            };
            };
            


        }
        console.log(myCards);
            });
    }







args = process.argv;
cmd = args[2].toLowerCase();
if (cmd === "printall") {
    printAll();
    

    
} 
else if (cmd === "printflash") {
    printFlash();
}
else if (cmd === "printcloze") {
    printCloze();
}
else if (cmd === "flash") {
    flashPrompt();
} else if (cmd === "cloze") {
    clozePrompt();
}





