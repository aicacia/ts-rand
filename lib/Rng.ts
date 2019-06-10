import { IIterator, Iterator, Option, some } from "@stembord/core";
import { MAX_INT } from "./constants";

export type ByteArray = Uint8Array | number[];

export abstract class Rng implements IIterator<number> {
  abstract nextInt(): number;

  nextFloat() {
    return this.nextInt() / MAX_INT;
  }

  fillBytes(bytes: ByteArray): ByteArray {
    const tmpBytes = new Uint8Array(4);

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

function getBytes(bytes: ByteArray, num: number) {
  bytes[0] = (num & 0xff000000) >> 24;
  bytes[1] = (num & 0x00ff0000) >> 16;
  bytes[2] = (num & 0x0000ff00) >> 8;
  bytes[3] = num & 0x000000ff;
}
