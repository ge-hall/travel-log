// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import './lib/env'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxtjs/color-mode'],
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
      standalone: false,
      autoInit: false,
      stylistic: true,
    },
  },
})
