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
  suffle,
} from ".";

tape("nextInt", (assert: tape.Test) => {
  assert.equal(getDefaultRng(), PARK_MILLER_RNG);
  setDefaultRng(X_OR_SHIFT_RNG);
  assert.equal(getDefaultRng(), X_OR_SHIFT_RNG);
  setDefaultRng(PARK_MILLER_RNG); // set it back for other tests
  assert.end();
});

tape("nextInt", (assert: tape.Test) => {
  assert.equal(nextInt(), 2072078316);
  assert.end();
});

tape("nextFloat", (assert: tape.Test) => {
  assert.equal(nextFloat(), 0.0437732730264651);
  assert.end();
});

tape("random", (assert: tape.Test) => {
  assert.equal(random(), 0.9796612770201923);
  assert.end();
});

tape("iter", (assert: tape.Test) => {
  assert.deepEqual(iter().take(4).toArray(), [
    0.2294810210491908,
    0.27836190735844984,
    0.8076238431071974,
    0.8105124741841632,
  ]);
  assert.end();
});

tape("fillBytes", (assert: tape.Test) => {
  assert.deepEqual(
    fillBytes(new Uint8Array([0, 0, 0, 0, 0, 0])),
    new Uint8Array([31, 178, 29, 84, 2, 8])
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
      -3.7758412020168457,
      -3.630690071094171,
      2.959547437708614,
      0.31418672078949683,
      -3.892920221617874,
      4.84795740332825,
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
    [-4, -5, 1, -3, 4, 0]
  );
  assert.end();
});

tape("suffle", (assert: tape.Test) => {
  assert.deepEqual(
    [
      suffle([0, 1, 2, 3, 4]),
      suffle([0, 1, 2, 3, 4]),
      suffle([0, 1, 2, 3, 4]),
      suffle([0, 1, 2, 3, 4]),
      suffle([0, 1, 2, 3, 4]),
    ],
    [
      [0, 1, 2, 3, 4],
      [1, 3, 2, 4, 0],
      [0, 3, 1, 4, 2],
      [0, 1, 2, 3, 4],
      [3, 2, 4, 1, 0],
    ]
  );
  assert.end();
});
