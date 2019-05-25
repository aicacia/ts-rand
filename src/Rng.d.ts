import { IIterator, Iterator, Option } from "@stembord/core";
export declare abstract class Rng implements IIterator<number> {
    abstract nextInt(): number;
    nextFloat(): number;
    iter(): Iterator<number>;
    next(): Option<number>;
}
