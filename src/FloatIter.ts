import { Iterator, Option, some } from "@aicacia/core";
import { Rng } from "./Rng";

export class FloatIter<R extends Rng = Rng> extends Iterator<number> {
  private rng: R;

  constructor(rng: R) {
    super(rng);

    this.rng = rng;
  }

  next(): Option<number> {
    return some(this.rng.nextFloat());
  }
}
