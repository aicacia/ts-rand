import { integerToBytes } from "@aicacia/hash";
import { MAX_INT } from "./constants";
import { Rng } from "./Rng";

let randomInt: () => number;
let fillBytes: <B extends Uint8Array | number[] = Uint8Array | number[]>(
  bytes: B
) => B;

if (typeof crypto !== "undefined" && crypto.getRandomValues) {
  const UINT32_ARRAY = new Uint32Array(1);
  randomInt = () => crypto.getRandomValues(UINT32_ARRAY)[0] % MAX_INT;
  fillBytes = (bytes) =>
    crypto.getRandomValues(
      Array.isArray(bytes)
        ? (new Uint8Array(bytes) as any)
        : (bytes as Uint8Array)
    );
} else {
  const TMP_BYTES = new Uint8Array(4);
  randomInt = () => (Math.random() * MAX_INT) | 0;
  fillBytes = (bytes) => {
    const tmpBytes = TMP_BYTES;

    for (let i = 0, il = bytes.length; i < il; i++) {
      const index = i % 4;

      if (index === 0) {
        integerToBytes(tmpBytes, randomInt());
      }

      bytes[i] = tmpBytes[index];
    }

    return bytes;
  };
}

export class NativeRng extends Rng {
  nextInt(): number {
    return randomInt();
  }
  fillBytes<B extends Uint8Array | number[] = Uint8Array | number[]>(
    bytes: B
  ): B {
    return fillBytes(bytes);
  }
}
