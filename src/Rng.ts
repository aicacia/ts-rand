import { IIterator, Iterator, Option, some } from "@aicacia/core";
import { MAX_INT } from "./constants";

export type ByteArray = Uint8Array | number[];

const TMP_BYTES = new Uint8Array(4);

export abstract class Rng implements IIterator<number> {
  abstract nextInt(): number;

  nextFloat() {
    return this.nextInt() / MAX_INT;
  }

  nextFloatInRange(min: number, max: number) {
    return this.nextFloat() * (max - min) + min;
  }

  nextIntInRange(min: number, max: number) {
    return Math.round(this.nextFloatInRange(min, max));
  }

  sortFunction() {
    return () => {
      const x = this.nextFloat();

      if (x < 0.33334) {
        return -1;
      } else if (x < 0.66667) {
        return 0;
      } else {
        return 1;
      }
    };
  }
  suffle<T>(array: T[]) {
    return array.sort(this.sortFunction());
  }

  fillBytes(bytes: ByteArray): ByteArray {
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

  iter() {
    return new Iterator(this);
  }

  next(): Option<number> {
    return some(this.nextFloat());
  }
}

function getBytes(bytes: ByteArray, integer: number): ByteArray {
  bytes[0] = (integer & 0xff000000) >> 24;
  bytes[1] = (integer & 0x00ff0000) >> 16;
  bytes[2] = (integer & 0x0000ff00) >> 8;
  bytes[3] = integer & 0x000000ff;
  return bytes;
}
