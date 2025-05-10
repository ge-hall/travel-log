// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

import './lib/env';

export default defineNuxtConfig({
  modules: [
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  colorMode: {
    dataValue: 'theme',
  },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      // formatter: true,
      stylistic: { semi: true },

    },
  },
});
