export abstract class Rng {
  abstract next(): number;

  fill_bytes(array: number[]): number[] {
    for (let i = 0, il = array.length; i < il; i++) {
      array[i] = this.next();
    }
    return array;
  }
}
