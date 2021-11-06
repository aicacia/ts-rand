import { Iter } from "@aicacia/iter";
import type { Rng } from "./Rng";

export class FloatIter<R extends Rng = Rng>
  extends Iter<number>
  implements Iterator<number>, Iterable<number>
{
  private rng: R;

  constructor(rng: R) {
    super(rng);
    this.rng = rng;
  }

  iter() {
    return new Iter(this);
  }

  next(): IteratorResult<number, undefined> {
    return { done: false, value: this.rng.nextFloat() };
  }
}
