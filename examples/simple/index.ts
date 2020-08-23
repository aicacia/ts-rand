import { Rng, ParkMillerRng, XorShiftRng } from "../../src";

const SIZE = 512;

function onLoad() {
  const root = document.getElementById("root");

  root.appendChild(generateRand(new ParkMillerRng(Date.now())));
  root.appendChild(generateRand(XorShiftRng.fromSeed(Date.now())));
}

function generateRand(rng: Rng) {
  const element = document.createElement("div"),
    text = document.createElement("h3"),
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

  canvas.width = canvas.height = SIZE;
  canvas.style.width = canvas.style.height = `${SIZE}px`;

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      const n = rng.nextFloat();
      ctx.fillStyle = `rgb(${n * 100}%, ${n * 100}%, ${n * 100}%)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  text.textContent = Object.getPrototypeOf(rng).constructor.name;
  element.appendChild(text);

  element.appendChild(canvas);

  return element;
}

window.addEventListener("load", onLoad);
