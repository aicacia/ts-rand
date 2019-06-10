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

export function random(): number {
  return DEFAULT_RNG.nextFloat();
}
