import { nodeResolve } from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"

export default [
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.js", format: "es", sourcemap: true },
      { file: "dist/index.cjs", format: "cjs", sourcemap: true, exports: "named" }
    ],
    external: id => id.startsWith("@codemirror") || id.startsWith("@lezer"),
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        exclude: ["**/parser.js"]
      })
    ]
  }
]
