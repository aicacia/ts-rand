import * as tape from "tape";
import { ParkMillerRng } from ".";

tape("ParkMillerRng defaults", (assert: tape.Test) => {
  const rng = new ParkMillerRng();

  assert.equal(rng.nextInt(), 2072078316);
  assert.equal(rng.nextInt(), 94002388);

  assert.isEquivalent(rng.nextFloat(), 0.9796612770201923);
  assert.isEquivalent(rng.nextFloat(), 0.2294810210491908);

  assert.end();
});

tape("ParkMillerRng with seed", (assert: tape.Test) => {
  const rng = new ParkMillerRng(100000000);

  assert.equal(rng.nextInt(), 1704242944);
  assert.equal(rng.nextInt(), 1855045888);

  assert.isEquivalent(rng.nextFloat(), 0.6027468445723629);
  assert.isEquivalent(rng.nextFloat(), 0.19292080411357843);

  assert.end();
});
