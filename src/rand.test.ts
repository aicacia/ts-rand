import { Range, some } from "@aicacia/core";
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
    new Range(0, 10)
      .iter()
      .map(() => nextFloatInRange(-1, 1))
      .toArray(),
    [
      -0.6341507221265467,
      0.3138421987247848,
      -0.06746187692855576,
      -1,
      0.7173751346847856,
      -1,
      -0.19724457650317095,
      1,
      -1,
      -0.45323732772527126,
      0.19101946972823702,
    ]
  );
  assert.end();
});

tape("nextIntInRange", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(
    new Range(0, 10)
      .iter()
      .map(() => nextIntInRange(-1, 1))
      .toArray(),
    [-1, 0, -0, -1, 1, -1, -0, 1, -1, -0, 0]
  );
  assert.end();
});

tape("uniformFloatRng", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  const rng = uniformFloatRng(-1.0, 1.0);
  assert.deepEqual(rng.take(5).toArray(), [
    -0.6341507221265467,
    0.3138421987247848,
    -0.06746187692855576,
    -1,
    0.7173751346847856,
  ]);
  assert.end();
});

tape("uniformIntRng", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  const rng = uniformIntRng(-1, 1);
  assert.deepEqual(rng.take(5).toArray(), [-1, 0, -0, -1, 1]);
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
      [3, 4, 1, 0, 2],
    ]
  );
  assert.end();
});

tape("fromArray", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  const array = new Range(0, 5).iter().toArray();
  assert.deepEqual(
    [
      array.map(() => fromArray(array).unwrap()),
      array.map(() => fromArray(array).unwrap()),
      array.map(() => fromArray(array).unwrap()),
      array.map(() => fromArray(array).unwrap()),
    ],
    [
      [1, 3, 2, 0, 4, 0],
      [2, 5, 0, 2, 3, 1],
      [4, 0, 5, 0, 0, 2],
      [1, 4, 4, 5, 4, 2],
    ]
  );
  assert.end();
});

tape("keyFromObject", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(keyFromObject({ a: 0, b: 1, c: 2 }), some("a"));
  assert.end();
});

tape("valueFromObject", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  assert.deepEqual(valueFromObject({ a: 0, b: 1, c: 2 }), some(0));
  assert.end();
});
