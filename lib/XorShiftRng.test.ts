import * as tape from "tape";
import { XorShiftRng } from ".";

tape("XorShiftRng defaults", (assert: tape.Test) => {
  const rng = new XorShiftRng();

  assert.equal(rng.nextInt(), 619799055);
  assert.equal(rng.nextInt(), 1298398820);

  assert.isEquivalent(rng.nextFloat(), 0.47751270769048143);
  assert.isEquivalent(rng.nextFloat(), 0.11588627664180765);

  assert.end();
});

tape("XorShiftRng", (assert: tape.Test) => {
  const rng = new XorShiftRng(100000000, 200000000, 300000000, 400000000);

  assert.equal(rng.nextInt(), 1115724315);
  assert.equal(rng.nextInt(), 388934537);

  assert.isEquivalent(rng.nextFloat(), 0.09216163265153841);
  assert.isEquivalent(rng.nextFloat(), 0.7468110559260525);

  assert.end();
});
