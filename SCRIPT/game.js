/* queryes */
const grid = document.querySelector(".game");
const discoveredCard = document.querySelector(".discovered-card");
const storageNames = document.querySelector(".storage-names");
const points = document.querySelector(".div-points .points");
const timer = document.querySelector(".span-time");
const newGameButton = document.querySelector(".new-game-button");

/* variables */
const names = [
  "Banana",
  "caroco",
  "finn",
  "gelado",
  "gunter",
  "Menta",
  "jake",
  "jujuba",
  "Lemon",
  "Marceline",
];

let firstCard;
let secondCard;

let score = 0;

const foundedCards = [];

let endBeginTimer = 0;

/* main Game */

/* functions */

function begin_timer() {
  let time = 40;
  const interval_id = setInterval(() => {
    timer.innerHTML = time;
    if (!endBeginTimer == 1) {
      time--;
    } else {
      clearInterval(interval_id);
      setTimeout(() => {
        endBeginTimer = 0;
      }, 1000);
      timer.innerHTML = "00";
    }
    if (time == 40) {
      time = 0;
    }
    if (time == 0) Reload_game();
  }, 1000);
}

function update_Points() {
  if (timer.innerHTML != "0") {
    score++;
    setTimeout(() => (points.innerHTML = score), 300);
  }
}

function clear_Var_cards_Reveald(f = "", s = "") {
  if (firstCard) {
    f && firstCard.classList.remove("reveal");
    firstCard = "";
  }

  if (secondCard) {
    s && secondCard.classList.remove("reveal");
    secondCard = "";
  }
}

function check_Cards() {
  if (
    firstCard.getAttribute("data-character") ==
    secondCard.getAttribute("data-character")
  ) {
    foundedCards.push(firstCard.getAttribute("data-character"));
    create_Founded_card(firstCard.getAttribute("data-character"));

    firstCard.children[0].classList.add("founded");
    secondCard.children[0].classList.add("founded");

    update_Points();

    clear_Var_cards_Reveald();
  } else {
    setTimeout(() => {
      clear_Var_cards_Reveald(1, 1);
    }, 600);
  }
}

function reveal_Cards({ target }) {
  if (timer.innerHTML == "00") {
    begin_timer();
  }

  if (timer.innerHTML === "00" || +timer.innerHTML >= 1) {
    if (!firstCard) {
      firstCard = target.parentNode;
      target.parentNode.classList.add("reveal");
    } else if (!secondCard) {
      secondCard = target.parentNode;
      target.parentNode.classList.add("reveal");
      check_Cards();
    }
  }
}

function delete_All_cards() {
  Array.from(grid.children).forEach((element) => element.remove());
}

function load_Game() {
  [...names, ...names]
    .sort(() => Math.random() - 0.5)
    .forEach((name) => {
      grid.append(create_Cards(name));
    });
}

/* NO Error */

function create_Founded_card(card) {
  const fcard = document.createElement("div");
  fcard.classList.add("f-card");
  fcard.style.backgroundImage = `url(../IMAGES/${card}.jpg)`;
  fcard.setAttribute("data-card", card);
  discoveredCard.appendChild(fcard);
}

function create_Cards(name) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = ` 
    <div class="face front" style="background-image: url(../IMAGES/${name}.jpg);"></div>
    <div class="face back"></div>
  `;
  card.setAttribute("data-character", name);
  card.addEventListener("click", reveal_Cards);
  return card;
}

/* execute Game */
load_Game();

newGameButton.addEventListener("click", Reload_game);

function Using_FoundedCards_clean_Cards_To_New_Game() {
  foundedCards.forEach((item) => {
    document.querySelector(`[data-card='${item}']`)?.remove();

    const cardToClean = document.querySelectorAll(`[data-character='${item}']`);

    cardToClean.forEach((element) => {
      element.children[0].classList.remove("founded");
      element.classList.remove("reveal");
    });
  });
}

function reset_Score_And_Renew_Timer() {
  score = 0;
  points.innerHTML = "0";
  endBeginTimer = 1;
}

function Reload_game() {
  Using_FoundedCards_clean_Cards_To_New_Game();
  reset_Score_And_Renew_Timer();
  for (let i = 0; i <= foundedCards.length; i++) {
    foundedCards.forEach((element) => {
      console.log(element);
      const shifted = foundedCards.shift();
      console.log(shifted, " Shifted");
    });
  }
  clear_Var_cards_Reveald();
  delete_All_cards();
  load_Game();
}
