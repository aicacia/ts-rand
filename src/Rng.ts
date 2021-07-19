import { Iter, Option, some, none } from "@aicacia/core";
import { MAX_INT } from "./constants";
import { FloatIter } from "./FloatIter";
import { UniformFloatIter } from "./UniformFloatIter";
import { UniformIntIter } from "./UniformIntIter";

const TMP_BYTES = new Uint8Array(4);

export abstract class Rng implements Iterator<number>, Iterable<number> {
  abstract nextInt(): number;

  nextFloat() {
    return this.nextInt() / MAX_INT;
  }

  /**
   * returns inclusive float between min and max
   */
  nextFloatInRange(min = 0.0, max = 1.0) {
    return min + this.nextFloat() * (max - min);
  }

  /**
   * returns inclusive integer between min and max
   */
  nextIntInRange(min = 0, max = MAX_INT) {
    return Math.round(this.nextFloatInRange(min, max));
  }

  shuffle<T>(array: T[]) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = i + this.nextIntInRange(0, length - i - 1),
        tmp = array[i];

      array[i] = array[randomIndex];
      array[randomIndex] = tmp;
    }
    return array;
  }

  fromArray<T>(array: T[]): Option<T> {
    if (array.length) {
      return some(array[this.nextIntInRange(0, array.length - 1)]);
    } else {
      return none();
    }
  }

  keyFromObject<K extends string | number | symbol, V>(
    object: Record<K, V>
  ): Option<K> {
    return this.fromArray(Object.keys(object) as K[]);
  }

  valueFromObject<K extends string | number | symbol, V>(
    object: Record<K, V>
  ): Option<V> {
    return this.fromArray(Object.values(object) as V[]);
  }

  fillBytes<B extends Uint8Array | number[] = Uint8Array | number[]>(
    bytes: B
  ): B {
    const tmpBytes = TMP_BYTES;

    for (let i = 0, il = bytes.length; i < il; i++) {
      const index = i % 4;

      if (index === 0) {
        getBytes(tmpBytes, this.nextInt());
      }

      bytes[i] = tmpBytes[index];
    }

    return bytes;
  }

  [Symbol.iterator]() {
    return this;
  }

  iter() {
    return new Iter(this);
  }

  next(): IteratorResult<number> {
    return { done: false, value: this.nextInt() };
  }

  float() {
    return new FloatIter(this);
  }

  uniformFloat(min = 0.0, max = 1.0) {
    return new UniformFloatIter(this, min, max);
  }

  uniformInt(min = 0, max = MAX_INT) {
    return new UniformIntIter(this, min, max);
  }
}

function getBytes<B extends Uint8Array | number[] = Uint8Array | number[]>(
  bytes: B,
  integer: number
): B {
  bytes[0] = (integer & 0xff000000) >> 24;
  bytes[1] = (integer & 0x00ff0000) >> 16;
  bytes[2] = (integer & 0x0000ff00) >> 8;
  bytes[3] = integer & 0x000000ff;
  return bytes;
}
