import { Iterator } from "@stembord/core";
import { ParkMillerRng } from "./ParkMillerRng";
import { ByteArray, Rng } from "./Rng";
import { XorShiftRng } from "./XorShiftRng";

export { ByteArray, Rng };
export { ParkMillerRng };
export { XorShiftRng };

export { MAX_INT } from "./constants";

export const PARK_MILLER_RNG = new ParkMillerRng();
export const X_OR_SHIFT_RNG = new XorShiftRng();
export let DEFAULT_RNG: Rng = PARK_MILLER_RNG;

export function nextInt(): number {
  return DEFAULT_RNG.nextInt();
}

export function nextFloat(): number {
  return DEFAULT_RNG.nextFloat();
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
