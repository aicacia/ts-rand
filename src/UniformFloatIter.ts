import { Iter } from "@aicacia/iter";
import type { Rng } from "./Rng";

export class UniformFloatIter<R extends Rng = Rng>
  extends Iter<number>
  implements Iterator<number>, Iterable<number>
{
  private rng: R;
  private min: number;
  private max: number;

  constructor(rng: R, min = 0.0, max = 1.0) {
    super(rng);
    this.rng = rng;
    this.min = min;
    this.max = max;
  }

  iter() {
    return new Iter(this);
  }

  nextFloat(): number {
    return this.rng.nextFloatInRange(this.min, this.max);
  }

  next(): IteratorResult<number, undefined> {
    return { done: false, value: this.nextFloat() };
  }
}
