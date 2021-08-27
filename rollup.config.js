import { dirname } from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import esmImportToUrl from "rollup-plugin-esm-import-to-url";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: dirname(pkg.module),
        format: "es",
        sourcemap: true,
        preserveModules: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      esmImportToUrl({
        imports: {
          "@aicacia/core": "https://unpkg.com/@aicacia/core@0/esm",
        },
      }),
      resolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.esm.json",
      }),
    ],
  },
];
