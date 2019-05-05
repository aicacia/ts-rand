export abstract class Rng {
  abstract nextInt(): number;

  next() {
    return this.nextInt() / 2147483647;
  }
}
