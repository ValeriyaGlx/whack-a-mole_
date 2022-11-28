const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const grains = document.querySelectorAll('.grain');
const timeBoard = document.querySelector('.time');
const finish = document.querySelector('.final');
const scoreFinish = document.querySelector('.scoreFinish');
const button = document.querySelector('button');


let lastGrain;
let timeUp = false;
let secondClick;
let score = 0;
let timeTo = 10;


function randomTime(min, max){
    return Math.round(Math.random()*(max-min)-min);
}

function randomGrain(grains){
let x = Math.floor(Math.random() * grains.length);
let grain = grains[x];

if(lastGrain===grain){
    return randomGrain(grains);
}

lastGrain = grain;
return grain;
}


function getUpMole(){
    const time = randomTime(100,2000);
    const grain = randomGrain(grains);
    const mole = grain.querySelector('.mole');
    mole.classList.add('up');
  
    setTimeout(() => { mole.classList.remove('up'); 
                      if(!timeUp) getUpMole() }, time);
}


function startGame(){
    timeUp = false;
    score = 0;
    timeTo = 10;
    getUpMole();

    setTimeout(() => timeUp = true, 10000);
    setTimeout(() => secondClick = false, 10000);
    setInterval(timer, 1000);
   

    if(secondClick===false){location.reload()};
}



function timer(){
  timeTo --;
  scoreFinish.textContent = score;


  if(timeTo < 0) return;
  if(timeTo===0){finish.classList.remove('hiden');  
                 button.textContent = 'ONE MORE TIME 😇';
                };

  timeBoard.textContent=timeTo;
}



function bonk(e){
    if(!e.isTrusted)return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}


moles.forEach(mole => mole.addEventListener('click', bonk));

