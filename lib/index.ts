import { ParkMillerRng } from "./ParkMillerRng";
import { Rng } from "./Rng";
import { XorShiftRng } from "./XorShiftRng";

export { Rng };
export { ParkMillerRng };
export { XorShiftRng };

export const PARK_MILLER_RNG = new ParkMillerRng();
export const X_OR_SHIFT_RNG = new XorShiftRng();
export let DEFAULT_RNG: Rng = PARK_MILLER_RNG;

export function random(): number {
  return DEFAULT_RNG.nextFloat();
}
