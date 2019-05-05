import * as tape from "tape";
import { XorShiftRng } from "../lib";

tape("XorShiftRng", (assert: tape.Test) => {
  const rng = new XorShiftRng();

  assert.equal(rng.nextInt(), 619799055);
  assert.equal(rng.nextInt(), 1298398820);

  assert.isEquivalent(rng.next(), 0.47751270769048143);
  assert.isEquivalent(rng.next(), 0.11588627664180765);

  assert.end();
});
