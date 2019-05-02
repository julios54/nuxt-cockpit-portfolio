import pkg from './package'

require('dotenv').config() // we already added this ealier when making our .env file
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')
import axios from 'axios'
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/nuxt-cockpit-portfolio/'
        }
      }
    : {}

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || []
  }
}

export default {
  mode: 'universal',

  ...routerBase,

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: './assets/img/favicon.png'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Rubik:300,400,600|Raleway:100,600'
      },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en_GB',
            file: 'en.js'
          },
          {
            code: 'fr',
            iso: 'fr_FR',
            file: 'fr.js'
          }
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'lang/',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        }
      }
    ]
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: [
        require('tailwindcss')('./tailwind.js'),
        require('autoprefixer')
      ]
    },
    extractCSS: true,
    /*
     You can extend webpack config here
    */
    extend(config, { isDev }) {
      if (!isDev) {
        // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
        // for more information about purgecss.
        config.plugins.push(
          new PurgecssPlugin({
            // Specify the locations of any files you want to scan for class names.
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                // Specify the file extensions to include when scanning for
                // class names.
                extensions: ['html', 'vue']
              }
            ],
            whitelist: [
              'html',
              'body',
              'ul',
              'ol',
              'pre',
              'code',
              'blockquote'
            ],
            whitelistPatterns: [/\bhljs\S*/]
          })
        )
      }
    }
  },

  generate: {
    routes: async () => {
      let { data } = await axios.post(
        `${process.env.COCKPIT_API_BASE_URL}/collections/get/Portfolio?token=${
          process.env.COCKPIT_API_KEY
        }`,
        JSON.stringify({}),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      return data.entries.map(work => {
        return {
          route: 'work/' + work.slug,
          payload: work
        }
      })
    }
  }
}
