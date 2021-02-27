import { MAX_INT } from "./constants";
import { Rng } from "./Rng";

export class NativeRng extends Rng {
  nextInt(): number {
    return (Math.random() * MAX_INT) | 0;
  }
  nextFloat(): number {
    return Math.random();
  }
}
