'use strict';
const path = require('path');
module.exports = {
  type: 'client',
  framework: 'react',
  commonsChunk: ['vendor'],
  manifest:false,
  html: true,
  entry: {
    include: 'page',
    exclude: ['page/test'],
    template: 'view/layout.html',
    extMatch: '.jsx',
    loader: {
      client: 'framework/entry/loader.js'
    }
  },
  alias: {
    asset: 'asset',
    app: 'framework/vue/app.js',
    component: 'component',
    framework: 'framework',
    store: 'store'
  },
  create() {
    // call api custom config
  }
};