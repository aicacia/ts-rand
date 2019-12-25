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
  X_OR_SHIFT_RNG
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
  assert.deepEqual(
    iter()
      .take(4)
      .toArray(),
    [
      0.2294810210491908,
      0.27836190735844984,
      0.8076238431071974,
      0.8105124741841632
    ]
  );
  assert.end();
});

tape("fillBytes", (assert: tape.Test) => {
  assert.deepEqual(fillBytes(new Uint8Array([0, 0, 0, 0, 0, 0])), [
    31,
    178,
    29,
    84,
    2,
    8
  ]);
  assert.end();
});
