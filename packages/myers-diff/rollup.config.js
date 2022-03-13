// https://ncjamieson.com/bundling-cjs-as-esm/
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: ['src/index'],
  output: [
    {
      file: './dist/index.esm.js',
      format: 'esm',
      // https://rollupjs.org/guide/en/#outputexports
      exports: 'named',
    },
    {
      file: './dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
    },
  ],
  plugins: [commonjs()],
}
