import { IIterator, Iterator, Option, some } from "@stembord/core";
import { MAX_INT } from "./constants";

export abstract class Rng implements IIterator<number> {
  abstract nextInt(): number;

  nextFloat() {
    return this.nextInt() / MAX_INT;
  }

  iter() {
    return new Iterator(this);
  }

  next(): Option<number> {
    return some(this.nextFloat());
  }
}
