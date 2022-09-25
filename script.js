const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')


const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const diceEl = document.querySelector('.dice')

let scores, currentScore, activePlayer, playing

const init = () => {
   scores = [0,0]
  currentScore = 0
  activePlayer = 0
  //playing variable to stop the game from contenueing 
  playing = true

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  //starting conditions
  score0El.textContent = 0
  score1El.textContent = 0
  diceEl.classList.add('hidden')
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player1El.classList.add('player--active')
  player1El.classList.remove('player--active')
}
init()

const switchPlayer = () => {
    //switch player
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle makes sure its only on one of the elements at a time
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

//rolling function
const btnRollFunc = () => {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1
    console.log(dice);
    diceEl.classList.remove('hidden')
    //dynomically load one of the six dice
    diceEl.src = `dice-${dice}.png`

    //if is a 1 than switch player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
      switchPlayer()
    }
  }
  
}

const btnHoldFunc = () => {
  if (playing) {
    //add current score to active players score
    scores[activePlayer] += currentScore
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
    //check if score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    } else {

      //finish the game
      switchPlayer()
    }
  }
  
}

const btnNewFunc = () => {
 init()
}

btnNew.addEventListener('click',btnNewFunc)
btnHold.addEventListener('click',btnHoldFunc)
btnRoll.addEventListener('click', btnRollFunc)