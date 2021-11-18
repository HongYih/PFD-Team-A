// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if (textInput.value !== '') {
    // Add background animation
    body.style.background = '#141414 url(images/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = e => {
      console.log('Done speaking...');
      body.style.background = '#141414';
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());


//---------------------------------------------------------------------------------------------------------\\
onload = function() {
	if ('speechSynthesis' in window) with(speechSynthesis) {

		var playEle = document.querySelector('#play');
		var pauseEle = document.querySelector('#pause');
		var stopEle = document.querySelector('#stop');
		var flag = false;

		playEle.addEventListener('click', onClickPlay);
		pauseEle.addEventListener('click', onClickPause);
		stopEle.addEventListener('click', onClickStop);

		function onClickPlay() {
			if (!flag) {
				flag = true;
				utterance = new SpeechSynthesisUtterance(document.querySelector('body').textContent);
				utterance.voice = getVoices()[0];
				utterance.onend = function() {
					flag = false;
					playEle.className = pauseEle.className = '';
					stopEle.className = 'stopped';
				};
				playEle.className = 'played';
				stopEle.className = '';
				speak(utterance);
			}
			if (paused) { /* unpause/resume narration */
				playEle.className = 'played';
				pauseEle.className = '';
				resume();
			}
		}

		function onClickPause() {
			if (speaking && !paused) { /* pause narration */
				pauseEle.className = 'paused';
				playEle.className = '';
				pause();
			}
		}

		function onClickStop() {
			if (speaking) { /* stop narration */
				/* for safari */
				stopEle.className = 'stopped';
				playEle.className = pauseEle.className = '';
				flag = false;
				cancel();

			}
		}

	}

	else { /* speech synthesis not supported */
		msg = document.createElement('h5');
		msg.textContent = "Detected no support for Speech Synthesis";
		msg.style.textAlign = 'center';
		msg.style.backgroundColor = 'red';
		msg.style.color = 'white';
		msg.style.marginTop = msg.style.marginBottom = 0;
		document.body.insertBefore(msg, document.querySelector('div'));
	}

}