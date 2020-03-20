// for chrome
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// setting the vocab and grammar
let colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral'];
let grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';

// initiate speech recognition
let recognition = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// html elements
const main = document.getElementsByTagName("main")[0];
const startText = main.getElementsByTagName("section")[0];
const thoughts = main.getElementsByTagName("section")[1];
const button = document.getElementsByTagName("button")[0];
let index = 0;

// write down what user says
recognition.start();

recognition.onresult = function(event) {
    // make initial text disappear
    if (index == 0) {
        startText.classList.add("invis");
    }
    
    // add new p element with the speech result
    let para = document.createElement("P");
    para.classList.add("invis");
    para.textContent = event.results[index][0].transcript;
    thoughts.appendChild(para);
    
    // make the p element appear
    setTimeout(() => {
        para.classList.remove("invis")
    }, 300);
    
    // when theres more than 3 p elements, remove top one
    index++;

    if (index >= 4) {
        thoughts.children[(0)].classList.add("invis");

        setTimeout(() => {
            thoughts.removeChild(thoughts.children[0]);
        }, 700);
    }  
}