import { MAX_INT } from "./constants";
import { Rng } from "./Rng";

export class ParkMillerRng extends Rng {
  private seed: number;

  constructor(seed = 0x193a6754) {
    super();

    this.seed = seed;
  }

  nextInt(): number {
    this.seed = Math.imul(48271, this.seed) | 0 % MAX_INT;
    return this.seed & MAX_INT;
  }
}
