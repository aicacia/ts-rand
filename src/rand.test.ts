import { some } from "@aicacia/core";
import { Range } from "@aicacia/core";
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
  uniformFloat,
  uniformInt,
  XorShiftRng,
  fromArray,
  keyFromObject,
  valueFromObject,
  float,
  NATIVE_RNG,
} from ".";

tape("nextInt", (assert: tape.Test) => {
  assert.equal(getDefaultRng(), NATIVE_RNG);
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
  assert.deepEqual(
    iter().take(4).toArray(),
    [619799055, 1298398820, 1025450731, 248863884]
  );
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
      -0.42276714808436444, 0.20922813248318994, -0.04497458461903714,
      -0.7682274467163848, 0.47825008978985717, -0.8070137108708796,
      -0.1314963843354473, 0.687537061836355, -0.7474057533533339,
      -0.3021582184835142, 0.12734631315215794,
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
    [-0, 0, -0, -1, 0, -1, -0, 1, -1, -0, 0]
  );
  assert.end();
});

tape("uniformFloat", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  const rng = uniformFloat(-1.0, 1.0);
  assert.deepEqual(
    rng.iter().take(5).toArray(),
    [
      -0.42276714808436444, 0.20922813248318994, -0.04497458461903714,
      -0.7682274467163848, 0.47825008978985717,
    ]
  );
  assert.end();
});

tape("uniformInt", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  const rng = uniformInt(-1, 1);
  assert.deepEqual(rng.iter().take(5).toArray(), [-0, 0, -0, -1, 0]);
  assert.end();
});

tape("float", (assert: tape.Test) => {
  setDefaultRng(new XorShiftRng());
  const rng = float();
  assert.deepEqual(
    rng.iter().take(5).toArray(),
    [
      0.2886164259578178, 0.604614066241595, 0.47751270769048143,
      0.11588627664180765, 0.7391250448949286,
    ]
  );
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
  const array = new Range(0, 5).iter().toArray();
  assert.deepEqual(
    [
      array.map(() => fromArray(array).unwrap()),
      array.map(() => fromArray(array).unwrap()),
      array.map(() => fromArray(array).unwrap()),
      array.map(() => fromArray(array).unwrap()),
    ],
    [
      [1, 3, 2, 1, 4, 0],
      [2, 4, 1, 2, 3, 1],
      [4, 0, 5, 0, 0, 2],
      [2, 4, 3, 5, 4, 2],
    ]
  );
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
