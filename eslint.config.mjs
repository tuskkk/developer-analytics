// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt([
    {
      ignores: [
        '**/node_modules',
        '**/public',
        '**/dist',
        '**/.nuxt',
        '**/test',
        '*.cjs',
        '*.mjs',
        '*.json',
        '*.md',
      ],
    },
      eslintPluginPrettierRecommended,
  ]);
