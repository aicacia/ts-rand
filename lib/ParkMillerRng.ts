import { Rng } from "./Rng";

export class ParkMillerRng extends Rng {
  seed: number = 0x193a6754;

  constructor(seed: number = 0x193a6754) {
    super();

    this.seed = seed;
  }

  nextInt(): number {
    this.seed = Math.imul(48271, this.seed) | 0 % 2147483647;
    return this.seed & 2147483647;
  }
}
