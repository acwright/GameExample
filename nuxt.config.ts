// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  imports: {
    dirs: ['engine/*.ts']
  },
  typescript: {
    strict: true
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Game Example',
      meta: [
        { name: 'description', content: 'HTML/Canvas game example' }
      ]
    }
  }
})
