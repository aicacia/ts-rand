import * as tape from "tape";
import { range } from "@aicacia/range";
import { XorShiftRng } from ".";

tape("XorShiftRng defaults", (assert: tape.Test) => {
  const rng = new XorShiftRng();

  assert.equal(rng.nextInt(), 619799055);
  assert.equal(rng.nextInt(), 1298398820);

  assert.isEquivalent(rng.nextFloat(), 0.47751270769048143);
  assert.isEquivalent(rng.nextFloat(), 0.11588627664180765);

  assert.end();
});

tape("XorShiftRng with seed", (assert: tape.Test) => {
  const rng = new XorShiftRng(100000000, 200000000, 300000000, 400000000);

  assert.equal(rng.nextInt(), 1115724315);
  assert.equal(rng.nextInt(), 388934537);

  assert.isEquivalent(rng.nextFloat(), 0.09216163265153841);
  assert.isEquivalent(rng.nextFloat(), 0.7468110559260525);

  assert.end();
});

tape("XorShiftRng with fromSeed", (assert: tape.Test) => {
  const rng = XorShiftRng.fromSeed(100000000);

  assert.equal(rng.nextInt(), 664658361);
  assert.equal(rng.nextInt(), 954514827);

  assert.isEquivalent(rng.nextFloat(), 0.5293325598022587);
  assert.isEquivalent(rng.nextFloat(), 0.327552259586543);

  assert.end();
});

tape("XorShiftRng fromSeed consistent", (assert: tape.Test) => {
  const [a, b] = range(1, 1000)
    .iter()
    .reduce<[number[], number[]]>([[], []], (acc, i) => {
      acc[0].push(XorShiftRng.fromSeed(i * 164027629532).nextInt());
      acc[1].push(XorShiftRng.fromSeed(i * 164027629532).nextInt());
      return acc;
    });
  assert.deepEqual(a, b);
  assert.end();
});
