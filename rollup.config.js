import { terser } from "rollup-plugin-terser";
import { uglify } from "rollup-plugin-uglify";
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const config = {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.min.js',
      format: 'iife',
      name: 'vanu',
      plugins: [
        terser(),
        getBabelOutputPlugin({ 
          allowAllFormats: true,
          presets: [
            [
              '@babel/preset-env',
              {
                exclude: ["@babel/plugin-transform-typeof-symbol"]
              }
            ]
          ]
        }),
        uglify()
      ]
    },
    { file: 'dist/index.js', format: 'umd', name: 'vanu' },
    { file: 'dist/index.esm.js', format: 'esm', name: 'vanu' }
  ]
};

export default config;