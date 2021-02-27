import { Iterator, Option, some } from "@aicacia/core";
import { MAX_INT } from "./constants";
import { Rng } from "./Rng";

export class UniformIntIter<R extends Rng = Rng> extends Iterator<number> {
  private rng: R;
  private min: number;
  private max: number;

  constructor(rng: R, min = 0, max = MAX_INT) {
    super(rng);

    this.rng = rng;
    this.min = min | 0;
    this.max = max | 0;
  }

  nextInt(): number {
    return this.rng.nextIntInRange(this.min, this.max);
  }

  next(): Option<number> {
    return some(this.nextInt());
  }
}
