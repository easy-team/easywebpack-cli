# easywebpack-cli

Webpack Building Command Line Tool for [easywebpack](https://github.com/hubcarl/easywebpack-cli.git), Global Command `easywebpack`

`easywebpack` 命令默认会读取项目根目录 `webpack.config.js` 配置(见底部举例), 然后根据 `framework` 字段自动根据映射到构建解决方案.
 目前支持 `vue` ([easywebpack-vue](https://github.com/hubcarl/easywebpack-vue.git)) 和 `weex` ([easywebpack-weex](https://github.com/hubcarl/easywebpack-weex.git))解决方案.


## 安装

```bash
$ npm i easywebpack-cli -g
```


## 运行


```bash
easywebapck -h
```

Usage: easywebpack [command] [options]


  Options:

    -V, --version          output the version number
    -f, --filename [path]  webpack config file name, default webpack.config.js
    -w, --watch            webpack watch and hot-update
    -m, --hash             webpack md5 hash js/css/image
    -c, --compress         webpack compress js/css/image
    -b, --build [option]   w(watch), m(hash) , c(compress), ex: wm/wc/mc/wmc
    -h, --help             output usage information


  Commands:

    install                npm install
    print  [env] [options] print webpack config, support print by env or config node key
    build  [env]            webpack building
    server [env]           webpack building and start server



## 命令介绍

### 编译举例

- easywebpack build

- easywebpack build -f build/webpack.config.js

- easywebpack build -c

- easywebpack build dev

- easywebpack build test

- easywebpack build prod

- easywebpack build -b wmc 

### 编译和启动服务举例

- easywebpack server

- easywebpack server -f build/webpack.config.js

- easywebpack server dev

- easywebpack server test

- easywebpack server prod

- easywebpack server -b wmc 

### 打印配置

```bash
easywebpack print -h
```

 Usage: print [env] [options]

  print webpack config, support print by env or config node key


  Options:

    -n, --node [key]  print webpack config info by config node key, example: [module/module.rules/plugins] and so on
    -h, --help        output usage information

- easywebpack print -n module

- easywebpack print test -n module.rules

- easywebpack print prod -n module.rules[0]

- easywebpack print dev -n plugins

- easywebpack print dev -n plugins[0]

- easywebpack print dev -n output

- easywebpack print dev -n resolve


## webpack.config.js

```js
module.exports = {
  egg: true, // 如果是egg项目, 请设置为true, 满足egg目录规范
  framework: 'vue',
  commonsChunk: ['vendor'],
  entry: {
    include: 'app/web/page',
    exclude: ['app/web/page/html']
  },
  html: {
    include: 'app/web/page/html',
    template: 'app/web/view/layout.html',
    buildDir: 'html',
    options: {}
  },
  alias: {
    asset: 'app/web/asset',
    app: 'app/web/framework/vue/app.js',
    component: 'app/web/component',
    framework: 'app/web/framework',
    store: 'app/web/store'
  },
  packs: {
    'pack/inline': ['app/web/framework/inject/pack-inline.js']
  },
  create() {
    if (this.config.type === 'client') {
      this.addEntry('vendor', ['vue', 'axios']);
    }
  }
};

```