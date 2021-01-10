import { Iterator, Option, some } from "@aicacia/core";
import { Rng } from "./Rng";

export class UniformFloatRng<R extends Rng = Rng> extends Iterator<number> {
  private rng: R;
  private min: number;
  private max: number;

  constructor(rng: R, min = 0.0, max = 1.0) {
    super(rng);

    this.rng = rng;
    this.min = min;
    this.max = max;
  }

  nextFloat(): number {
    return this.rng.nextFloatInRange(this.min, this.max);
  }

  next(): Option<number> {
    return some(this.nextFloat());
  }
}
