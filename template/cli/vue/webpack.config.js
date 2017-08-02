'use strict';
module.exports = {
  framework: 'vue',
  commonsChunk: ['vendor'],
  entry: {
    include: 'web/page',
    exclude: ['web/page/html']
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
    if (this.type === 'client') {
      this.addEntry('vendor', ['vue', 'axios']);
    }
  }
};
