import { Rng } from "./Rng";

export class XorShiftRng extends Rng {
  x: number = 0x193a6754;
  y: number = 0xa8a7d469;
  z: number = 0x97830e05;
  w: number = 0x113ba7bb;

  constructor(
    x: number = 0x193a6754,
    y: number = 0xa8a7d469,
    z: number = 0x97830e05,
    w: number = 0x113ba7bb
  ) {
    super();

    this.x = x | 0;
    this.y = y | 0;
    this.z = z | 0;
    this.w = w | 0;
  }

  nextInt(): number {
    const x = this.x,
      t = x ^ (x << 11);

    this.x = this.y;
    this.y = this.z;
    this.z = this.w;

    const w = this.w;
    this.w = w ^ (w >> 19) ^ (t ^ (t >> 8));

    return this.w;
  }
}
