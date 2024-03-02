const typingText = document.querySelector('.typing-text p');
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector('button');

//set values

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraphs(){
    const paragraphs = [
        "The sun rose lazily over the horizon, casting a warm glow upon the sleepy town below.",
        "As the birds chirped their morning song, the aroma of freshly brewed coffee filled the air.",
        "Sarah sat by the window, sipping her coffee and watching the world awaken.",
        "She felt a sense of calm wash over her as she embraced the stillness of the early morning.",
        "In the distance, a gentle breeze rustled the leaves of the trees, creating a soothing melody.",
        "With each sip of her coffee, Sarah felt more present, more alive.",
        "She closed her eyes and took a deep breath, grateful for this moment of tranquility.",
        "As the day unfolded before her, she knew there would be challenges to face and obstacles to overcome.",
        "But for now, she allowed herself to simply be, to revel in the beauty of the dawn.",
        "In the kitchen, the radio played softly, filling the room with soft melodies.",
        "The sound of laughter echoed through the house as Sarah's family began to stir awake.",
        "She smiled, grateful for their presence and the love that surrounded her.",
        "Together, they would navigate the ups and downs of life, supporting each other every step of the way.",
        "As the sun climbed higher in the sky, its rays danced upon the surface of the nearby lake.",
        "Sarah watched as the water shimmered and sparkled in the morning light, feeling a sense of wonder wash over her.",
        "In that moment, she realized that life was filled with moments of magic, if only we took the time to notice.",
        "With a renewed sense of purpose, Sarah finished her coffee and set out to embrace whatever the day had in store.",
        "For she knew that no matter what challenges lay ahead, she would face them with courage and grace.",
        "And as the sun set once more, painting the sky in hues of orange and pink, Sarah reflected on the beauty of life and the endless possibilities that lay ahead.",
        "With a heart full of gratitude, she whispered a silent thank you to the universe for another day of love, laughter, and precious moments.",
        "And as she drifted off to sleep, she knew that tomorrow held the promise of even more wonders to discover."
    ];

    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = '';
    for(const char of paragraphs[randomIndex]){
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', ()=>{
        input.focus();
    });
    typingText.addEventListener("click",()=>{
        input.focus()
    })
}

//handle user input
function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            
        }
        else{
            char[charIndex].classList.add('incorrect');
            mistake++;
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;

        cpm.innerText = charIndex - mistake;
    }
    else{
        clearInterval(timer);
        input.value = '';
    }
}

function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;

        let wpmVal = Math.round(((charIndex - mistake)/5)/ (maxTime - timeLeft)*60);

        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraphs();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    charIndex = 0;
    mistake = 0;
    isTyping = false; 
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click",reset);
loadParagraphs();




