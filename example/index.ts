import { Rng, ParkMillerRng, XorShiftRng, NativeRng } from "../src";

const SIZE = 512,
  rngs = [
    function XorShift() {
      return XorShiftRng.fromSeed(Date.now());
    },
    function ParkMiller() {
      return new ParkMillerRng(Date.now());
    },
    function Native() {
      return new NativeRng();
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
    ctx = canvas.getContext("2d"),
    width = SIZE,
    height = SIZE,
    uniformIntRng = rng.uniformInt(0, 256),
    imagedata = ctx.createImageData(width, height);

  canvas.width = canvas.height = width;
  canvas.style.width = canvas.style.height = `${width}px`;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pixelindex = (y * width + x) * 4;
      imagedata.data[pixelindex] = uniformIntRng.nextInt();
      imagedata.data[pixelindex + 1] = uniformIntRng.nextInt();
      imagedata.data[pixelindex + 2] = uniformIntRng.nextInt();
      imagedata.data[pixelindex + 3] = 255;
    }
  }

  ctx.putImageData(imagedata, 0, 0);
}

window.addEventListener("load", onLoad);
