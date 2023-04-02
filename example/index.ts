import { type Rng, ParkMillerRng, XorShiftRng, NativeRng } from "../src";

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
  document.getElementById("regenerate")?.addEventListener("click", regenerate);
}

function regenerate() {
  rngs.forEach((rng) => generateRand(rng));
}

function createRngElement(id: string) {
  const element = document.createElement("div"),
    text = document.createElement("h3"),
    time = document.createElement("span"),
    canvas = document.createElement("canvas");

  element.id = id;
  element.style.marginLeft = "8px";
  canvas.width = canvas.height = SIZE;
  canvas.style.width = canvas.style.height = `${SIZE}px`;

  text.classList.add("title");
  text.textContent = id;

  time.classList.add("time");
  time.style.marginLeft = "8px";
  text.appendChild(time);

  element.appendChild(text);
  element.appendChild(canvas);
  document.getElementById("root")?.appendChild(element);

  return element;
}

function generateRand(rngCreator: () => Rng) {
  const rng = rngCreator(),
    element = document.getElementById(rngCreator.name) as HTMLElement,
    timeElement = element.getElementsByClassName("time")[0] as HTMLSpanElement,
    canvas = element.getElementsByTagName("canvas")[0] as HTMLCanvasElement,
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D,
    width = SIZE,
    height = SIZE,
    uniformIntRng = rng.uniformInt(0, 256),
    imagedata = ctx.createImageData(width, height);

  canvas.width = canvas.height = width;
  canvas.style.width = canvas.style.height = `${width}px`;

  const startMS = performance.now();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pixelindex = (y * width + x) * 4;
      const color = uniformIntRng.nextInt();
      imagedata.data[pixelindex] = color;
      imagedata.data[pixelindex + 1] = color;
      imagedata.data[pixelindex + 2] = color;
      imagedata.data[pixelindex + 3] = 255;
    }
  }
  const endMS = performance.now() - startMS;
  timeElement.textContent = `${endMS}ms`;

  ctx.putImageData(imagedata, 0, 0);
}

if (document.readyState === "complete") {
  onLoad();
} else {
  window.addEventListener("load", onLoad);
}
