export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Yoga House',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/jpg', href: '/logo.jpg' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/global.css'],
  modules: ['@nuxt/image'],

  // 🆕 добавляем публичные переменные для Supabase
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY
    }
  }
})
