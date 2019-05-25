import { ParkMillerRng } from "./ParkMillerRng";
import { Rng } from "./Rng";
import { XorShiftRng } from "./XorShiftRng";
export { Rng };
export { ParkMillerRng };
export { XorShiftRng };
export { MAX_INT } from "./constants";
export declare const PARK_MILLER_RNG: ParkMillerRng;
export declare const X_OR_SHIFT_RNG: XorShiftRng;
export declare let DEFAULT_RNG: Rng;
export declare function random(): number;
