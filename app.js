"use strict";
const container = document.getElementById("container");

let listOfColor = [
  "white",
  "purple",
  "blue",
  "brown",
  "green",
  "orange",
  "white",
  "green",
  "orange",
  "purple",
  "brown",
  "blue"
];

/*Randomizing the list at first then creating the cards,
to make sure every every card has a pair.
 */
listOfColor.sort(() => 0.5 - Math.random());

listOfColor.forEach(color => {
  const cardWrapper = document.createElement("div");
  const frontCard = document.createElement("div");
  const backCard = document.createElement("div");

  cardWrapper.className = "memory-card";
  frontCard.className = `front-card ${color}`;
  backCard.className = "back-card gray";
  frontCard.style.backgroundColor = `${color}`;

  cardWrapper.dataset.name = color;

  cardWrapper.appendChild(backCard);
  cardWrapper.appendChild(frontCard);
  container.appendChild(cardWrapper);
});

let firstClick = false;
let firstCard, secondCard;
let wait = false;
let timer = 0;
let timerP = document.getElementById("timer");
const cards = document.querySelectorAll(".memory-card");

cards.forEach(card => card.addEventListener("click", toggleRotateClass));

function toggleRotateClass() {
  if (wait) return;
  if (this === firstCard) return;

  this.classList.toggle("rotate");

  if (!firstClick) {
    firstClick = true;
    firstCard = this;
  } else {
    firstClick = false;
    secondCard = this;
    checkForMatchingCards();
  }
}

setInterval(function start() {
  timer++;
  return (timerP.innerHTML = "your time is " + timer);
}, 1000);

function checkForMatchingCards() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    removeClickEvent() && removeToggleClass();
    ++correctAnswerCounter;
    console.log(correctAnswerCounter);
    return;
  }
  return removeToggleClass();
}

//if cards are matching, turning cards into non-clickable objects
function removeClickEvent() {
  firstCard.removeEventListener("click", toggleRotateClass);
  secondCard.removeEventListener("click", toggleRotateClass);
}

function removeToggleClass() {
  wait = true;
  setTimeout(() => {
    firstCard.classList.remove("rotate");
    secondCard.classList.remove("rotate");
    wait = false;
  }, 1000);
}
