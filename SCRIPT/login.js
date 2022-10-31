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

function pop_splited_For_Validate_Number(arr) {
  while (arr.length > 12) {
    arr.pop();
  }
  const array = arr.join("");
  return array;
}

const validate_Number = () => {
  const string = name.value.trim();
  const splited = string.split("");
  if (splited.length <= 12) return string;

  return pop_splited(splited);
};

form.addEventListener("submit", (event) => {
  localStorage.setItem("player", /* name.value.trim() */ validate_Number());
  event.preventDefault();
  if (window.location.href.includes("racr")) {
    window.location.assign(
      "https://racr-1.github.io/Memory-Game/PAGES/game.html"
    );
  } else {
    window.location.assign("/PAGES/game.html");
  }
});

window.onload = checkInput;
