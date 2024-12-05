import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'iife'],
  target: 'esnext',
  sourcemap: false,
  clean: true,
  minify: true,
  dts: true,
  outDir: 'dist',
  splitting: false,
  treeshake: true,
  banner: {
    js: `// RPC for your chrome extension`
  }
})
