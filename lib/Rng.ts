import { IIterator, Iterator, Option, some } from "@stembord/core";
import { MAX_INT } from "./constants";

type ByteArray = Uint8Array | number[];

export abstract class Rng implements IIterator<number> {
  abstract nextInt(): number;

  nextFloat() {
    return this.nextInt() / MAX_INT;
  }

  fillBytes(bytes: ByteArray): ByteArray {
    for (let i = 0, il = bytes.length / 4; i < il; i++) {
      fillByte(bytes, i, this.nextInt());
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

function fillByte(array: ByteArray, index: number, num: number) {
  array[index] = (num & 0xff000000) >> 24;
  array[index + 1] = (num & 0x00ff0000) >> 16;
  array[index + 2] = (num & 0x0000ff00) >> 8;
  array[index + 3] = num & 0x000000ff;
}
