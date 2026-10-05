let jokesarea = document.querySelector(".Jokearea");
let button = document.querySelector("button");
let text = document.querySelector("textarea");

function handle_data(input) {
  if (input.trim() === "") {
    return 0;
  } else if (input >= 0 && input <= 99) {
    return input;
  } else {
    jokesarea.innerHTML = `<h1  class="mt-4 text-danger text-decoration-underline text-center">Please enter a valid number</h1>`;
    return -400;
  }
}
text.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    mainfunction();
  }
});
button.addEventListener("click", () => {
  mainfunction();
});

function display_data(name, photo) {
  jokesarea.innerHTML = `<h1 class="text-warning text-center">${name}</h1>
<img src="${photo}" alt="error" class="w-50 m-auto"/>`;
}

function searchdata(data, num) {
  let name = data.data.memes[num].name;
  let photo = data.data.memes[num].url;
  display_data(name, photo);
}
function mainfunction() {
  let input = handle_data(text.value);
  text.value = "";
  if (input != -400) {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        searchdata(data, input);
      })
      .catch((error) => {
        jokesarea.innerHTML = `<h1>${error.message}</h1>`;
      });
  }
}
