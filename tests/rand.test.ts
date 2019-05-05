import * as tape from "tape";
import { DEFAULT_RNG } from "../lib";

tape("rand", (assert: tape.Test) => {
  assert.deepEqual(
    DEFAULT_RNG.iter()
      .take(4)
      .toArray(),
    [
      0.9648866564803229,
      0.0437732730264651,
      0.9796612770201923,
      0.2294810210491908
    ]
  );
  assert.end();
});
