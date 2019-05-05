import * as tape from "tape";
import { XorShiftRng } from "../lib";

tape("XorShiftRng", (assert: tape.Test) => {
  const rng = new XorShiftRng();

  assert.equal(rng.next(), 619799055);

  const bytes: number[] = [];
  bytes.length = 4;
  rng.fill_bytes(bytes);
  assert.deepEqual(bytes, [1298398820, 1025450731, 248863884, 1587258947]);

  assert.end();
});
