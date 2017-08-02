'use strict';
module.exports = {
  framework: 'vue',
  commonsChunk: ['vendor'],
  entry: {
    include: 'web/page',
    exclude: ['web/page/html']
  },
  html: {
    include: 'web/page/html',
    template: 'web/view/layout.html',
    buildDir: 'html',
    options: {}
  },
  alias: {
    asset: 'web/asset',
    app: 'web/framework/vue/app.js',
    component: 'web/component',
    framework: 'web/framework',
    store: 'web/store'
  },
  packs: {
  },
  create() {

  }
};
