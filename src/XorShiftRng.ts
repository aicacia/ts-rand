import { Rng } from "./Rng";
import { ParkMillerRng } from "./ParkMillerRng";

const RNG = new ParkMillerRng();

export class XorShiftRng extends Rng {
  private x: number;
  private y: number;
  private z: number;
  private w: number;

  constructor(x = 0x193a6754, y = 0xa8a7d469, z = 0x97830e05, w = 0x113ba7bb) {
    super();

    this.x = x | 0;
    this.y = y | 0;
    this.z = z | 0;
    this.w = w | 0;
  }

  static fromSeed(seed?: number) {
    const rng = RNG.setSeed(seed);

    return new XorShiftRng(
      rng.nextInt(),
      rng.nextInt(),
      rng.nextInt(),
      rng.nextInt()
    );
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
