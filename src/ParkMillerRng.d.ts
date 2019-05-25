import { Rng } from "./Rng";
export declare class ParkMillerRng extends Rng {
    seed: number;
    constructor(seed?: number);
    nextInt(): number;
}
