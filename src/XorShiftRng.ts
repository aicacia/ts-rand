import { Rng } from "./Rng";
import { ParkMillerRng } from "./ParkMillerRng";

const RNG = new ParkMillerRng();

export class XorShiftRng extends Rng {
  private x = 0x193a6754;
  private y = 0xa8a7d469;
  private z = 0x97830e05;
  private w = 0x113ba7bb;

  constructor(x?: number, y?: number, z?: number, w?: number) {
    super();
    this.set(x, y, z, w);
  }

  static fromSeed(seed?: number) {
    return new XorShiftRng().setSeed(seed);
  }

  setSeed(seed?: number) {
    const rng = RNG.setSeed(seed);
    return this.set(rng.nextInt(), rng.nextInt(), rng.nextInt(), rng.nextInt());
  }

  set(x = 0x193a6754, y = 0xa8a7d469, z = 0x97830e05, w = 0x113ba7bb) {
    this.x = x | 0;
    this.y = y | 0;
    this.z = z | 0;
    this.w = w | 0;
    return this;
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
