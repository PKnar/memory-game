const memoryGame = (() => {
  "use strict";
  const container = document.getElementById("container");
  const winnerDiv = document.getElementById("winnerDiv");
  const button = document.getElementById("restart");
  const timerP = document.getElementById("timer");

  let firstClick = false;
  let firstCard, secondCard;
  let wait = false;
  let timer = 0;
  let correctAnswerCounter = 0;

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

  /* add event listener to each card */
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

  const startTimer = setInterval(() => {
    timer++;
    return (timerP.innerHTML = "Your time is " + timer);
  }, 1000);

  const stopTimer = () => {
    clearInterval(startTimer);
  };

  function checkForMatchingCards() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
      removeClickEvent() && removeRotateClass();
      correctAnswerCounter++;
      if (correctAnswerCounter === listOfColor.length / 2) {
        stopTimer();
        winnerDiv.style.display = "block";
      }
      return;
    }
    return removeRotateClass();
  }

  //if cards are matching, turning cards into non-clickable objects
  function removeClickEvent() {
    firstCard.removeEventListener("click", toggleRotateClass);
    secondCard.removeEventListener("click", toggleRotateClass);
  }

  function removeRotateClass() {
    wait = true;
    setTimeout(() => {
      firstCard.classList.remove("rotate");
      secondCard.classList.remove("rotate");
      wait = false;
    }, 1000);
  }

  //click the button to reload the game
  const reload = () => {
    document.location.reload();
  };
  button.addEventListener("click", reload);
})();

document.addEventListener("load", memoryGame);
