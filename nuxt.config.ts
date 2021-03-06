import { resolve } from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const {
  NODE_ENV,
  PORT: port = 8080,
  HOST: host = '0.0.0.0',
  DOMAIN: domain = 'http://localhost',
} = process.env;

const isDev = !(NODE_ENV === 'production');
const baseURL = `${domain}:${port}`;

const configFile = resolve(process.cwd(), 'client', 'tsconfig.json');

export default {
  mode: 'universal',
  modern: false,
  telemetry: false,

  srcDir: 'client/',
  buildDir: 'dist/client',

  env: {
    NODE_ENV,
    port,
    host,
    domain,
  },

  server: {
    port,
  },

  dev: isDev,

  globalName: 'root',

  loading: false,
  loadingIndicator: false,

  /*
   ** Headers of the page
   */
  head: {
    title: 'title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'description' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['plugins/i18n', 'plugins/axios'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'Deutsch',
            code: 'de',
            iso: 'de-DE',
            file: 'de-DE.js',
          },
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js',
          },
        ],
        langDir: '../common/Localisation/',
        defaultLocale: 'de',
        lazy: true,
      },
    ],
  ],

  axios: {
    baseURL,
  },

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/stylelint-module'],

  typescript: {
    typeCheck: {
      tsconfig: configFile,
    },

    loaders: {
      ts: {
        configFile,
      },
    },
  },

  /*
   ** Build configuration
   */
  build: {
    cache: false,
    extractCSS: true,
    publicPath: '/bundles/',

    transpile: ['vee-validate/dist/rules'],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // config.resolve.alias.vue = 'vue/dist/vue.common'

      if (!config.resolve) {
        config.resolve = {};
      }
      if (!config.resolve.plugins) {
        config.resolve.plugins = [];
      }
      config.resolve.plugins.push(new TsconfigPathsPlugin({ configFile: configFile }));
    },
  },

  render: {
    http2: { push: true },
  },

  stylelint: {
    /* module options */
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/login', method: 'post', propertyName: 'token' },
          user: { url: '/user', method: 'get', propertyName: false },
          logout: false,
        },
      },
      tokenRequired: true,
      tokenType: 'Bearer',
      globalToken: true,
      autoFetchUser: true,
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/',
    },
  },

  vuetify: {
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#689F38',
          accent: '#bea11c',
          secondary: '#827717',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252',
        },
        light: {
          primary: '#9CCC65',
          accent: '#FDD835',
          secondary: '#827717',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252',
        },
      },
    },
  },
};
