import * as tape from "tape";
import { NativeRng } from ".";
import { MAX_INT } from "./constants";

tape("NativeRng nextInt/nextFloat", (assert: tape.Test) => {
  const rng = new NativeRng();

  assert.equal(
    rng
      .iter()
      .take(1_000_000)
      .filter((x) => x <= 0 && x >= MAX_INT)
      .count(),
    0
  );
  assert.equal(
    rng
      .uniformFloat()
      .take(1_000_000)
      .filter((x) => x <= 0.0 && x >= 1.0)
      .count(),
    0
  );

  assert.end();
});
