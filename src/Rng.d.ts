import { IIterator, Iterator, Option } from "@stembord/core";
declare type ByteArray = Uint8Array | number[];
export declare abstract class Rng implements IIterator<number> {
    abstract nextInt(): number;
    nextFloat(): number;
    fillBytes(bytes: ByteArray): ByteArray;
    iter(): Iterator<number>;
    next(): Option<number>;
}
export {};
