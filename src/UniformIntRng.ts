import { Iterator, Option, some } from "@aicacia/core";
import { Rng } from "./Rng";

export class UniformIntRng<R extends Rng> extends Iterator<number> {
  private rng: R;
  private min: number;
  private max: number;

  constructor(rng: R, min = 0, max = 1) {
    super(rng);

    this.rng = rng;
    this.min = min | 0;
    this.max = max | 0;
  }

  next(): Option<number> {
    return some(this.rng.nextIntInRange(this.min, this.max));
  }
}
