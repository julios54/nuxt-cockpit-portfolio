import path from 'path'
import axios from 'axios'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import glob from 'glob-all'

import pkg from './package'

require('dotenv').config()

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/nuxt-cockpit-portfolio/'
        }
      }
    : {}

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
          'https://fonts.googleapis.com/css?family=Inconsolata:400,700|Lato:300,400,700'
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
  css: [{ src: '~assets/scss/app.scss', lang: 'sass' }],

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
    '@nuxtjs/markdownit',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            name: 'English',
            iconBase64:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAFJklEQVRIS+2Wa1BUZRjHf2f3wAK7G4iKiOItNRgZawxdaSa/mF3GcHJSKTPvhXjBTEnLQMOAtMQL5XhDx2tZQ5OCHwybRmcSSR2VodEhvCIBXgYW2HV195zTnHfdlU1KqQ/1ofPlvM/7Ppf/+7zPTRpHUvZgKpZacBgAWtcV6j/2bYFfKm+Kddsve10XQVrmzwjY98llzb8vExYmsyQvIoDPJ9eKWa1gcI6UjVnxGW8LYMaECQwftouampa/BcBolCj6diwVl4+2C0DYwqxK+aDpxLThCUhR0Zgzc5AThwmhxiYPKSkXabYrfiWlpQOxWo00xMej2u1i3xAeTrdz52hpURg1qkrsrS+IZWiiGUmSUG9cx/lxJp6fj/n1bD9eKdZ+AFOGDfIeShIhE6cQOisdKTiY5maFjIwazp69LY4fBiA5uZqNG3sRFxcq+O/+WIojdzlasxcsRhl53EQKFy72msteVyg8MF9r4u6+neC+Kw7kAU9gyV6J3H8giqJRVNRIfn7DXwK4fVulsdFDTEwwmqOV1s9yuVPynf/WRtuzmNIXY+jVB1VV2L+/+j6AjLenotbW4CpYhefoD150JhPmOQsIe2MKigpHjrRgs1kwmw0BT2Ds0YOoEyfQNOFA3GdO0Zy5GKX2mveJevclJH0xctIIQZ8+7SQv7xDFxReQYKX2wgt9ycp6iSFDwgSD/lbOtXmoF38VdLAtifDslWidu6EHl26kbQwYY2OJKi9HR9BSkI9jx1ZQFCSLlZDpszGNnwRBQdTXuykpsbN79y3Ky4u9l9QB6AubLZmUlEiSkyPo2TNIKHAV7eX2pvWoLXYMj4UT8eFHhL74shBsD4By4zr1I59BkgyYxrxKaNq7GCI7C/6DB+1s2HAdh0MVtB+ALwYy06f73+pRFu164FEE7/GsWL8tMAj/NQC+OvBa9+4dwP/PWb+qq/N64H8APg9MjIvrkF/V5maRdt5EN2CwWjskv/f8+f9IEPrS8J1pUwQiWZYwmQyi2KCpaE4nmqogBZswhIT4b9leGmoeN6rT2zMMoaEgB4m1x6Phcnnz3/et3b7D64G2hSgjI5rRo8PFQcuhg9QtmoeutNeaz+n0ylixrztdx/ZndcB1oZpLUyfhqqoicmYaUe8vQ5JlysocrF5dz82bHqEnoBJ2725mz57JJCWZ0dxuGnKyuFW4CVPvPvTbsZuwQQniua/WuOjSOfjBXuArxfeup7S2cnleGk3FBwh9eiixG7YR1KMnDQ0e1q5toKys9cFKqDcjd+01rrw1GeeZU4Q/N4rHN29DjohAUTW+L7XzSW49JSUDHpgHjDExRJ08ib1ZISREwhRsQNM06taspjZvBUZrOLEFm7GOfF5A1PvB+PFbAoMwtU83rqan4mlqosfCRfT8IBPJaOSOW+XTVfWUFHv7+cPmgdTUK3yxoRedImTB33S4lOqZ04TebnMXEL0kC0k2cuBAFXPnHr5fiGzWUIwWM/03FdI5eYxX2O5hdtpVLl684w+ehwHQJ6KwMAM5uTGidRskCdflS5x/fQLOykostiT6btnJ1n6xXg/46sCIpxKI//JrwuLihftOnHKw5L1anM7A6H0UAD60k96MZFZqV2TZgOJwUD0njRvf7COoa1eOXam99wR/GErnuRWWLf+J3JyygLTxER2ZinWZxMRoSg+nULBjj1DRdppuxapI+lj+JBVLzffG8n3Dd1F+/Ld2jeubHQWgy3TqFMKC5ZYAALrxChJyfwdy2oeb0oaIwAAAAABJRU5ErkJggg==',
            iso: 'en_GB',
            file: 'en.js'
          },
          {
            code: 'fr',
            name: 'Français',
            iconBase64:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAjUlEQVRIS2N01pktzszMvIeBgUGHAQ+wSfqPTxpDTrkyF696RgaGKwyMjC6MbvrzLhOyHGQStR0AMhPkCJADwF5TEA7B6+L+bZwkhcAHVSW86g+8fQuWH3XAaAiMhsBoCIyGwGgIjIbAaAiMhsCgCIEBa5QyMDCcZwQ1y5mYmfcxMjBo0bNZDrackdETAIE6sTOFYlSxAAAAAElFTkSuQmCC',
            iso: 'fr_FR',
            file: 'fr.js'
          }
        ],
        defaultLocale: 'fr',
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

  markdownit: {
    injected: true,
    use: ['markdown-it-highlightjs']
  },

  /*
   ** Build configuration
   */
  build: {},

  generate: {
    routes: async () => {
      const routes = []
      const locales = [
        {
          code: 'en',
          prefix: 'en/'
        },
        {
          code: 'fr',
          prefix: ''
        }
      ]
      let i
      let j
      for (i in locales) {
        const [worksResult, blogResult] = await Promise.all([
          axios.post(
            `${
              process.env.COCKPIT_API_BASE_URL
            }/collections/get/Portfolio?token=${process.env.COCKPIT_API_KEY}`,
            JSON.stringify({
              lang: locales[i].code
            }),
            {
              headers: { 'Content-Type': 'application/json' }
            }
          ),
          axios.post(
            `${process.env.COCKPIT_API_BASE_URL}/collections/get/Blog?token=${
              process.env.COCKPIT_API_KEY
            }`,
            JSON.stringify({
              lang: locales[i].code
            }),
            {
              headers: { 'Content-Type': 'application/json' }
            }
          )
        ])

        const workRoutes = worksResult.data.entries.map(work => {
          return {
            route: locales[i].prefix + 'work/' + work.slug,
            payload: work
          }
        })

        const blogRoutes = blogResult.data.entries.map(post => {
          return {
            route: locales[i].prefix + 'blog/' + post.slug,
            payload: post
          }
        })

        for (j in workRoutes) {
          routes.push(workRoutes[j])
        }

        for (j in blogRoutes) {
          routes.push(blogRoutes[j])
        }
      }

      return routes
    }
  }
}
