import type { Iter } from "@aicacia/iter";
import type { Option } from "@aicacia/option";
import { NativeRng } from "./NativeRng";
import { ParkMillerRng } from "./ParkMillerRng";
import { Rng } from "./Rng";
import { XorShiftRng } from "./XorShiftRng";

export { NativeRng, Rng, ParkMillerRng, XorShiftRng };

export { MAX_INT } from "./constants";
export { FloatIter } from "./FloatIter";
export { UniformFloatIter } from "./UniformFloatIter";
export { UniformIntIter } from "./UniformIntIter";

export const PARK_MILLER_RNG = new ParkMillerRng();
export const X_OR_SHIFT_RNG = new XorShiftRng();
export const NATIVE_RNG = new NativeRng();

let DEFAULT_RNG: Rng = NATIVE_RNG;

export function setDefaultRng(rng: Rng) {
  DEFAULT_RNG = rng;
}

export function getDefaultRng() {
  return DEFAULT_RNG;
}

export function nextInt(): number {
  return DEFAULT_RNG.nextInt();
}

export function nextFloat(): number {
  return DEFAULT_RNG.nextFloat();
}

export function nextFloatInRange(min: number, max: number): number {
  return DEFAULT_RNG.nextFloatInRange(min, max);
}

export function nextIntInRange(min: number, max: number): number {
  return DEFAULT_RNG.nextIntInRange(min, max);
}

export function shuffle<T>(array: T[]): T[] {
  return DEFAULT_RNG.shuffle(array);
}

export function fromArray<T>(array: T[]): Option<T> {
  return DEFAULT_RNG.fromArray(array);
}

export function keyFromObject<K extends string | number | symbol, V>(
  object: Record<K, V>
): Option<K> {
  return DEFAULT_RNG.keyFromObject(object);
}

export function valueFromObject<K extends string | number | symbol, V>(
  object: Record<K, V>
): Option<V> {
  return DEFAULT_RNG.valueFromObject(object);
}

export function fillBytes<
  B extends Uint8Array | number[] = Uint8Array | number[]
>(bytes: B): B {
  return DEFAULT_RNG.fillBytes(bytes);
}

export function iter(): Iter<number> {
  return DEFAULT_RNG.iter();
}

export function random(): number {
  return DEFAULT_RNG.nextFloat();
}

export function float() {
  return DEFAULT_RNG.float();
}

export function uniformFloat(min = 0.0, max = 1.0) {
  return DEFAULT_RNG.uniformFloat(min, max);
}

export function uniformInt(min = 0, max = 1) {
  return DEFAULT_RNG.uniformInt(min, max);
}
