'use strict';
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnroll = document.querySelector('.btn--roll');
const btnnew = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');
const current0E1 = document.querySelector('#current--0');
const current1E1 = document.querySelector('#current--1');
let currentscore = 0;
let activeplayer = 0;
const scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  currentscore = 0;
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove('player--active');
  document.querySelector(
    `#current--${activeplayer}`
  ).textContent = currentscore;
  activeplayer = activeplayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.add('player--active');
};

// Starting Conditions

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEl.classList.add('hidden');

btnroll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentscore += dice;

      document.querySelector(
        `#current--${activeplayer}`
      ).textContent = currentscore;
    } else {
      switchPlayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    if (scores[activeplayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnnew.addEventListener('click', function () {
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  current0E1.textContent = 0;
  current1E1.textContent = 0;
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove('player--winner');
  playing = true;
  activeplayer = 1;
  scores[1] = 0;
  scores[0] = 0;
  switchPlayer();
});
