const name = document.querySelector("#name");
const button = document.querySelector("#button");
const form = document.querySelector(".login-form");

const checkInput = () => {
  setTimeout(() => {
    if (name.value.trim()) {
      button.removeAttribute("disabled");
    } else if (!name.value.trim()) button.setAttribute("disabled", "");
  }, 0);
};
name.addEventListener("keydown", checkInput);

form.addEventListener("submit", (event) => {
  localStorage.setItem("player", name.value.trim());
  if (window.location.href.includes("racr")) {
    window.location.assign(
      "https://racr-1.github.io/Memory-Game/PAGES/game.html"
    );
  } else {
    window.location.assign("/PAGES/game.html");
  }
  event.preventDefault();
});

window.onload = checkInput;
