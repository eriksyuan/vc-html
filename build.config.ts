import type { RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import esbuild, { minify } from 'rollup-plugin-esbuild'

const esbuildPlugin = esbuild()
const dtsPlugin = dts({
  compilerOptions: {
    preserveSymlinks: false,
  },
})

const input = 'src/index.ts'
const outputFileName = 'dist/index'

const configs: RollupOptions[] = [
  {
    input,
    output: [
      { file: `${outputFileName}.mjs`, format: 'es' },
      { file: `${outputFileName}.cjs`, format: 'cjs' },
    ],
    plugins: [esbuildPlugin],
  },
  {
    input,
    output: [
      { file: `${outputFileName}.browser-esm.js`, format: 'es' },
    ],
    plugins: [
      esbuildPlugin, resolve(), minify(),
    ],
    external: [
      'vue',
    ],
  },
  {
    input,
    output: [
      { file: `${outputFileName}.d.ts`, format: 'es' },
    ],
    plugins: [dtsPlugin],
  },
]

export default configs
