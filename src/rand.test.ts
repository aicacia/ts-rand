import { some } from "@aicacia/core";
import * as tape from "tape";
import {
  fillBytes,
  getDefaultRng,
  iter,
  nextFloat,
  nextInt,
  PARK_MILLER_RNG,
  random,
  setDefaultRng,
  X_OR_SHIFT_RNG,
  nextFloatInRange,
  nextIntInRange,
  shuffle,
  uniformFloatRng,
  uniformIntRng,
  XorShiftRng,
  fromArray,
  keyFromObject,
  valueFromObject,
} from ".";

tape("nextInt", (assert: tape.Test) => {
  assert.equal(getDefaultRng(), X_OR_SHIFT_RNG);
  setDefaultRng(PARK_MILLER_RNG);
  assert.equal(getDefaultRng(), PARK_MILLER_RNG);
  setDefaultRng(X_OR_SHIFT_RNG);
  assert.end();
});

tape("nextInt", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.equal(nextInt(), 619799055);
  assert.end();
});

tape("nextFloat", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.equal(nextFloat(), 0.2886164259578178);
  assert.end();
});

tape("random", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.equal(random(), 0.2886164259578178);
  assert.end();
});

tape("iter", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(iter().take(4).toArray(), [
    619799055,
    1298398820,
    1025450731,
    248863884,
  ]);
  assert.end();
});

tape("fillBytes", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(
    fillBytes(new Uint8Array([0, 0, 0, 0, 0, 0])),
    new Uint8Array([36, 241, 98, 15, 77, 99])
  );
  assert.end();
});

tape("nextFloatInRange", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(
    [
      nextFloatInRange(-5, 5),
      nextFloatInRange(-5, 5),
      nextFloatInRange(-5, 5),
      nextFloatInRange(-5, 5),
      nextFloatInRange(-5, 5),
      nextFloatInRange(-5, 5),
    ],
    [
      -2.1138357404218224,
      1.04614066241595,
      -0.22487292309518558,
      -3.8411372335819234,
      2.391250448949286,
      -4.035068554354398,
    ]
  );
  assert.end();
});

tape("nextIntInRange", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(
    [
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
    ],
    [-2, 1, -0, -4, 2, -4]
  );
  assert.end();
});

tape("uniformFloatRng", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  const rng = uniformFloatRng(-5.0, 5.0);
  assert.deepEqual(rng.take(5).toArray(), [
    -2.1138357404218224,
    1.04614066241595,
    -0.22487292309518558,
    -3.8411372335819234,
    2.391250448949286,
  ]);
  assert.end();
});

tape("uniformIntRng", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  const rng = uniformIntRng(-5, 5);
  assert.deepEqual(rng.take(5).toArray(), [-2, 1, -0, -4, 2]);
  assert.end();
});

tape("shuffle", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(
    [
      shuffle([0, 1, 2, 3, 4]),
      shuffle([0, 1, 2, 3, 4]),
      shuffle([0, 1, 2, 3, 4]),
      shuffle([0, 1, 2, 3, 4]),
      shuffle([0, 1, 2, 3, 4]),
    ],
    [
      [1, 3, 0, 2, 4],
      [0, 2, 4, 3, 1],
      [2, 0, 4, 3, 1],
      [0, 1, 3, 2, 4],
      [3, 4, 0, 2, 1],
    ]
  );
  assert.end();
});

tape("fromArray", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(fromArray([0, 1, 2]), some(1));
  assert.deepEqual(fromArray([0, 1, 2]), some(2));
  assert.deepEqual(fromArray([0, 1, 2]), some(1));
  assert.deepEqual(fromArray([0, 1, 2]), some(0));
  assert.deepEqual(fromArray([0, 1, 2]), some(2));
  assert.deepEqual(fromArray([0, 1, 2]), some(0));
  assert.end();
});

tape("keyFromObject", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(keyFromObject({ a: 0, b: 1, c: 2 }), some("b"));
  assert.end();
});

tape("valueFromObject", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(valueFromObject({ a: 0, b: 1, c: 2 }), some(1));
  assert.end();
});
