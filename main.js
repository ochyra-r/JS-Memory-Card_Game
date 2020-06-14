const cardsColor = [
  "red",
  "blue",
  "green",
  "violet",
  "gray",
  "lightgreen",
  "cadetblue",
  "yellow",
  "brown",
  "red",
  "blue",
  "green",
  "violet",
  "gray",
  "lightgreen",
  "cadetblue",
  "yellow",
  "brown",
];

let upperCards = [...document.querySelectorAll(".game div")];
let cards = [...document.querySelectorAll(".game div.front")];

const pop = document.querySelector(".pop");
const result = document.querySelector(".result");
const newGame = document.querySelector(".new-game");

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;

const clickCard = function () {
  activeCard = this;

  if (activeCard == activeCards[0]) return;

  activeCard.classList.remove("hidden");

  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  } else {
    cards.forEach((card) => {
      card.removeEventListener("click", clickCard);
    });
    activeCards[1] = activeCard;
    setTimeout(() => {
      if (activeCards[0].className === activeCards[1].className) {
        activeCards.forEach((active) => active.classList.add("off"));
        gameResult++;
        activeCards[0].parentNode.classList.add("rotate");
        activeCards[1].parentNode.classList.add("rotate");

        cards = cards.filter((card) => !card.classList.contains("off"));

        if (gameResult == gamePairs) {
          const endTime = new Date().getTime();
          const gameTime = (endTime - startTime) / 1000;
          setTimeout(() => {
            pop.style.display = "block";
            result.textContent = gameTime;
          }, 500);
        }
      } else {
        activeCards.forEach((active) => {
          active.classList.add("hidden");
        });
      }

      activeCard = "";
      activeCards.length = 0;

      cards.forEach((card) => card.addEventListener("click", clickCard));
    }, 500);
  }
};

const init = () => {
  cards.forEach((card) => {
    const index = Math.floor(Math.random() * cardsColor.length);
    card.classList.add(cardsColor[index]);
    cardsColor.splice(index, 1);
  });

  setTimeout(function () {
    cards.forEach((card) => {
      card.classList.add("hidden");
      card.addEventListener("click", clickCard);
    });
  }, 2000);
};

startNewGame = () => {
  pop.style.display = "none";
  if ((pop.style.display = "none")) {
    location.reload();
  }
};

newGame.addEventListener("click", startNewGame);
init();
