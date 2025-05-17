// @ts-check
import eslintConfigPrettier from "eslint-config-prettier/flat";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  ...eslintConfigPrettier,
});
// Your custom configs here
//
// {
//   rules: {
//     semi: ['error', 'always'],
//   },
// },

// .override('nuxt/rules', {
//   rules: {
//     // ...Override rules, for example
//   },
// }
// );
