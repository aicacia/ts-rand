import { integerToBytes } from "@aicacia/hash";
import { MAX_INT } from "./constants";
import { Rng } from "./Rng";

const HAS_CRYPTO =
  typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function";
const UINT32_ARRAY = new Uint32Array(1);
const TMP_BYTES = new Uint8Array(4);

const randomInt: () => number = HAS_CRYPTO
  ? () => crypto.getRandomValues(UINT32_ARRAY)[0] % MAX_INT
  : () => (Math.random() * MAX_INT) | 0;
const fillBytes: <B extends Uint8Array | number[] = Uint8Array | number[]>(
  bytes: B
) => B = HAS_CRYPTO
  ? (bytes) =>
      crypto.getRandomValues(
        Array.isArray(bytes)
          ? (new Uint8Array(bytes) as any)
          : (bytes as Uint8Array)
      )
  : (bytes) => {
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
