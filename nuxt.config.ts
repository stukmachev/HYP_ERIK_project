export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Yoga House',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/jpg', href: '/logo.jpg' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: '/api/v1'
    }
  },

  nitro: {
    devProxy: {
      '/api/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        prependPath: false
      }
    }
  },

  css: ['~/assets/global.css'],
  modules: ['@nuxt/image']
})
