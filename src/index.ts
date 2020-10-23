import { Iterator } from "@aicacia/core";
import { ParkMillerRng } from "./ParkMillerRng";
import { ByteArray, Rng } from "./Rng";
import { XorShiftRng } from "./XorShiftRng";

export { ByteArray, Rng };
export { ParkMillerRng };
export { XorShiftRng };

export { MAX_INT } from "./constants";
export { UniformFloatRng } from "./UniformFloatRng";
export { UniformIntRng } from "./UniformIntRng";

export const PARK_MILLER_RNG = new ParkMillerRng();
export const X_OR_SHIFT_RNG = new XorShiftRng();

let DEFAULT_RNG: Rng = X_OR_SHIFT_RNG;

export function setDefaultRng(rng: Rng) {
  DEFAULT_RNG = rng;
}

export function getDefaultRng() {
  return DEFAULT_RNG;
}

export function nextInt(): number {
  return DEFAULT_RNG.nextInt();
}

export function nextFloat(): number {
  return DEFAULT_RNG.nextFloat();
}

export function nextFloatInRange(min: number, max: number): number {
  return DEFAULT_RNG.nextFloatInRange(min, max);
}

export function nextIntInRange(min: number, max: number): number {
  return DEFAULT_RNG.nextIntInRange(min, max);
}

export function getSortFunction(): () => number {
  return DEFAULT_RNG.getSortFunction();
}

export function shuffle<T>(array: T[]): T[] {
  return DEFAULT_RNG.shuffle(array);
}

export function fillBytes(bytes: ByteArray): ByteArray {
  return DEFAULT_RNG.fillBytes(bytes);
}

export function iter(): Iterator<number> {
  return DEFAULT_RNG.iter();
}

export function random(): number {
  return DEFAULT_RNG.nextFloat();
}

export function uniformFloatRng(min = 0.0, max = 1.0) {
  return DEFAULT_RNG.uniformFloatRng(min, max);
}

export function uniformIntRng(min = 0, max = 1) {
  return DEFAULT_RNG.uniformIntRng(min, max);
}
