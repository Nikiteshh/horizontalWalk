const container = document.querySelector("div#main-container");
const character = document.querySelector("div#main-character");
let characterImg;

const fullHeight = container.scrollHeight;
const fullWidth = container.scrollWidth;
const clientWidth = container.clientWidth;
const maxScrollWidth = fullWidth - clientWidth;

container.addEventListener("wheel", function (evt) {
  evt.preventDefault();
  container.scrollLeft += evt.deltaY;
  setBgImage(container.scrollLeft);
});

function preload(totalImages) {
  for (let i = 1; i <= totalImages; i++) {
    const img = document.createElement("img");
    img.src = getImgUrl(i);
    character.appendChild(img);
  }
  characterImg = document.querySelectorAll("div#main-character img");
}
const count = 12;
preload(count);

function getImgUrl(num) {
  return `./boy/Asset ${num}.png`;
}

function setBgImage(position) {
  var imageNum;
  imageNum = parseInt((position / (0.01 * maxScrollWidth)) % count);
  for (i = 0; i < characterImg.length; i++) {
    characterImg[i].style.display = imageNum === i ? "block" : "none";
  }

  character.style.left = `${(position / maxScrollWidth) * 100}%`;
}
