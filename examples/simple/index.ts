import { Rng, ParkMillerRng, XorShiftRng } from "../../src";

const SIZE = 512,
  PIXEL_SIZE = 1,
  rngs = [
    function XorShift() {
      return XorShiftRng.fromSeed(Date.now());
    },
    function ParkMiller() {
      return new ParkMillerRng(Date.now());
    },
  ];

function onLoad() {
  rngs.forEach((rng) => createRngElement(rng.name));
  regenerate();
  document.getElementById("regenerate").addEventListener("click", regenerate);
}

function regenerate() {
  rngs.forEach((rng) => generateRand(rng));
}

function createRngElement(id: string) {
  const element = document.createElement("div"),
    text = document.createElement("h3"),
    canvas = document.createElement("canvas");

  element.id = id;
  element.style.marginLeft = "8px";
  canvas.width = canvas.height = SIZE;
  canvas.style.width = canvas.style.height = `${SIZE}px`;

  text.textContent = id;
  element.appendChild(text);
  element.appendChild(canvas);
  document.getElementById("root").appendChild(element);

  return element;
}

function generateRand(rngCreator: () => Rng) {
  const rng = rngCreator(),
    element = document.getElementById(rngCreator.name),
    canvas = element.getElementsByTagName("canvas")[0] as HTMLCanvasElement,
    ctx = canvas.getContext("2d");

  canvas.width = canvas.height = SIZE;
  canvas.style.width = canvas.style.height = `${SIZE}px`;

  for (let x = 0; x < SIZE; x += PIXEL_SIZE) {
    for (let y = 0; y < SIZE; y += PIXEL_SIZE) {
      ctx.fillStyle = `rgb(${rng.nextIntInRange(0, 100)}%, ${rng.nextIntInRange(
        0,
        100
      )}%, ${rng.nextIntInRange(0, 100)}%)`;
      ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
    }
  }
}

window.addEventListener("load", onLoad);
