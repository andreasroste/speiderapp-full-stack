module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'no_nb',
      fallbackLocale: 'no_nb',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  pwa: {
    name: 'Speiderapp',
    themeColor: '#596578',
    msTileColor: '#596578',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js'
    }
  }
}
