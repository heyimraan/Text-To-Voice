const synth = window.speechSynthesis;   // speechsynthesis API

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('#body');


let voices = [];

const GetVoices = () => {
    voices = synth.getVoices();   //the voice list is loaded async to the page. An onvoiceschanged event is fired when they are loaded "voices changed: fired when the contents of the sppechsynthesisVoice list that the getvoices method will return have changed so thhe trick is to set your voice from the callback for that event listner "
    
    // loop through voices  and add voices  options to the select tag in html
    voices.forEach((voice)=>{
        const option = document.createElement('option');
        //fill option with voices and language
        option.textContent = voice.name + '('+voice.lang+')';
        //set needed otion attributes
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);

        voiceSelect.appendChild(option);
    }); 
}

GetVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = GetVoices;
}

//Speak
const speak = () =>{
     // check if speaking 
     if(synth.speaking){
            console.error('Already Speaking');
            return;
     }
if(textInput.value !== ''){
    //Add background animation 
        body.style.background="#141414 url(wave.gif)";
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = "100% 100%";
    //Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //speak end
    speakText.onend = e =>{
        body.style.background="#141414";
        console.log("End of Speaking");
    }

    speakText.onerror = e =>{
        console.error("Something Went Wrong");
    }

    //Selected Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //Loop through voice 
    voices.forEach(music =>{
        if(music.name === selectedVoice){
            speakText.music = music;
        }
    });
     //  set pitch and rate
     speakText.rate = rate.value;
     speakText.pitch = pitch.value;

     // speak 
     synth.speak(speakText);
}
};

//Event listners

//text form submit
textForm.addEventListener('submit',e => {
    e.preventDefault();
    speak();
    textInput.blur(); 
});

//rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

//pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//voice select change
voiceSelect.addEventListener('change',e=> speak());


