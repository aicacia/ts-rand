import * as tape from "tape";
import { ParkMillerRng } from "../lib";

tape("ParkMillerRng", (assert: tape.Test) => {
  const rng = new ParkMillerRng();

  assert.equal(rng.nextInt(), 2072078316);
  assert.equal(rng.nextInt(), 94002388);

  assert.isEquivalent(rng.next(), 0.9796612770201923);
  assert.isEquivalent(rng.next(), 0.2294810210491908);

  assert.end();
});
