import { Rng } from "./Rng";
export declare class XorShiftRng extends Rng {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    nextInt(): number;
}
