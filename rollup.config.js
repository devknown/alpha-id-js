import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/AlphaID.ts',
  output: [
    {
      file: 'dist/AlphaID.js',
      format: 'umd',
      name: 'AlphaID',
      sourcemap: true,
    },
    {
      file: 'dist/AlphaID.min.js',
      format: 'umd',
      name: 'AlphaID',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript(),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};
