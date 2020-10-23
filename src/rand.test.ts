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
} from ".";

tape("nextInt", (assert: tape.Test) => {
  assert.equal(getDefaultRng(), X_OR_SHIFT_RNG);
  setDefaultRng(PARK_MILLER_RNG);
  assert.equal(getDefaultRng(), PARK_MILLER_RNG);
  setDefaultRng(X_OR_SHIFT_RNG); // set it back for other tests
  assert.end();
});

tape("nextInt", (assert: tape.Test) => {
  assert.equal(nextInt(), 619799055);
  assert.end();
});

tape("nextFloat", (assert: tape.Test) => {
  assert.equal(nextFloat(), 0.604614066241595);
  assert.end();
});

tape("random", (assert: tape.Test) => {
  assert.equal(random(), 0.47751270769048143);
  assert.end();
});

tape("iter", (assert: tape.Test) => {
  assert.deepEqual(iter().take(4).toArray(), [
    248863884,
    1587258947,
    207217450,
    932548656,
  ]);
  assert.end();
});

tape("fillBytes", (assert: tape.Test) => {
  assert.deepEqual(
    fillBytes(new Uint8Array([0, 0, 0, 0, 0, 0])),
    new Uint8Array([108, 0, 155, 114, 16, 42])
  );
  assert.end();
});

tape("nextFloatInRange", (assert: tape.Test) => {
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
      -1.5107910924175711,
      0.6367315657607895,
      -2.4543281120501126,
      2.886800466983952,
      -4.70894056358791,
      4.408359876558352,
    ]
  );
  assert.end();
});

tape("nextIntInRange", (assert: tape.Test) => {
  assert.deepEqual(
    [
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
      nextIntInRange(-5, 5),
    ],
    [-4, -4, -0, -2, 3, 2]
  );
  assert.end();
});

tape("shuffle", (assert: tape.Test) => {
  assert.deepEqual(
    [
      shuffle([0, 1, 2, 3, 4]),
      shuffle([0, 1, 2, 3, 4]),
      shuffle([0, 1, 2, 3, 4]),
      shuffle([0, 1, 2, 3, 4]),
      shuffle([0, 1, 2, 3, 4]),
    ],
    [
      [0, 1, 3, 4, 2],
      [0, 3, 2, 1, 4],
      [2, 1, 3, 4, 0],
      [1, 3, 0, 4, 2],
      [4, 3, 2, 1, 0],
    ]
  );
  assert.end();
});

tape("uniformFloatRng", (assert: tape.Test) => {
  const rng = uniformFloatRng(-5.0, 5.0);
  assert.deepEqual(rng.take(5).toArray(), [
    2.003176504281897,
    3.2679959937315424,
    -2.680003837533297,
    1.1042357078307479,
    -0.6304716857292094,
  ]);
  assert.end();
});

tape("uniformIntRng", (assert: tape.Test) => {
  const rng = uniformIntRng(-5, 5);
  assert.deepEqual(rng.take(5).toArray(), [-5, 4, -2, 4, 1]);
  assert.end();
});
