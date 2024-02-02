const container = document.querySelector("div#main-container");
const character = document.querySelector("div#main-character");
let characterImg;

const fullHeight = container.scrollHeight;
const fullWidth = container.scrollWidth;
const clientWidth = container.clientWidth;
const maxScrollWidth = fullWidth - clientWidth;

// Desktop browser support
container.addEventListener("wheel", function (evt) {
  evt.preventDefault();
  container.scrollLeft += evt.deltaY;
  setBgImage(container.scrollLeft);
});

// Mobile browser support
let prevTouch;
let currentTouch;
container.addEventListener("touchstart", function (evt) {
  evt.preventDefault();
  currentTouch = evt.touches[0].clientY;
  prevTouch = evt.touches[0].clientY;
});
container.addEventListener("touchmove", function (evt) {
  evt.preventDefault();
  prevTouch = currentTouch;
  currentTouch = evt.touches[0].clientY;

  let deltaY = 0;
  deltaY = prevTouch - currentTouch;
  console.log(container.scrollLeft, " - ", deltaY);
  container.scrollLeft += deltaY;
  setBgImage(container.scrollLeft);
});
container.addEventListener("touchend", function (evt) {
  evt.preventDefault();
  currentTouch = undefined;
  prevTouch = undefined;
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
