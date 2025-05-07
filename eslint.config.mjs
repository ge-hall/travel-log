// eslint.config.mjs
import antfu from '@antfu/eslint-config'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu(
    {
      type: 'app',
      typescript: true,
      vue: true,
      formatters: true,
      stylistic: {
        indent: 2,
        quotes: 'single',
      }, // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
      ignores: ['**/migrations/*'],
    },
    {
      files: ['**/*.js', '**/*.ts'],
      rules: {
        'node/prefer-global/process': ['off'],
      },
    },
  ),
)
// Your custom configs here
