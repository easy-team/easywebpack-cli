# easywebpack-cli

Webpack Building Command Line And Boilerplate Init Tool for [easywebpack](https://github.com/hubcarl/easywebpack-cli.git).

Global Command `easywebpack` or `easy`,  目前支持如下三种构建:

- `vue` ([easywebpack-vue](https://github.com/hubcarl/easywebpack-vue.git) 
- `react` ([easywebpack-react](https://github.com/hubcarl/easywebpack-react.git)
- `weex` ([easywebpack-weex](https://github.com/hubcarl/easywebpack-weex.git)

其中 `Vue` 和 `React` 支持客户端运行模式构建和服务端模式构建, `Weex` 支持Native模式和Web模式构建.

## 一.特性

- 支持`Vue`,`React`, `Weex` Webpack 编译和Server功能
- 支持`Vue`,`React`, `Weex` easywepback-cli 配置初始化[easywebpack-cli-template](https://github.com/hubcarl/easywebpack-cli-template.git)
- 支持`Vue`,`React`, `Weex` webpack config build 配置初始化[easywebpack-cli-template](https://github.com/hubcarl/easywebpack-cli-template.git)
- 支持`Vue`,`React`, `Weex` client render boilerplate 项目初始化[easywebpack-cli-template](https://github.com/hubcarl/easywebpack-cli-template.git)
- 支持`Vue`,`React` server side boilerplate 项目初始化[egg-vue-webpack-boilerplate](https://github.com/hubcarl/egg-vue-webpack-boilerplate.git), [egg-react-webpack-boilerplate](https://github.com/hubcarl/egg-react-webpack-boilerplate.git)


## 二. 安装

```bash
$ npm i easywebpack-cli -g
```


## 三. 运行


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
  
    init [options]         init webpack config or boilerplate for Vue/React/Weex
    install                npm install
    print  [env] [options] print webpack config, support print by env or config node key
    build  [env]           webpack building
    server [env]           webpack building and start server



## 四. 命令介绍

### 4.1 配置模板和Boilerplate初始化

- easywebpack init

> step one:

![nstep one](https://github.com/hubcarl/easywebpack-cli/blob/master/doc/cli-init-step-one.png)

> step two:

![step two](https://github.com/hubcarl/easywebpack-cli/blob/master/doc/cli-init-step-two.png)


默认读取项目根目录下的 `webpack.config.js` 配置

### 4.2 编译举例

- easywebpack build

- easywebpack build -f build/webpack.config.js

- easywebpack build -c

- easywebpack build dev

- easywebpack build test

- easywebpack build prod

- easywebpack build -b wmc 

### 4.3 编译和启动服务举例

- easywebpack server

- easywebpack server -f build/webpack.config.js

- easywebpack server dev

- easywebpack server test

- easywebpack server prod

- easywebpack server -b wmc 

### 4.4 打印配置

```bash
easywebpack print -h
```

 Usage: print [env] [options]

  print webpack config, support print by env or config node key


  Options:

    -n, --node [key]  print webpack config info by config node key, example: [module/module.rules/plugins] and so on
    -h, --help        output usage information

- easywebpack print -n module

- easywebpack print dev -n entry

- easywebpack print test -n module.rules

- easywebpack print prod -n module.rules[0]

- easywebpack print -n plugins

- easywebpack print -n plugins[0]

- easywebpack print -n output

- easywebpack print -n resolve


## 五. License

[MIT](LICENSE)

说明: npm 模板下载参考 [egg-init](https://github.com/eggjs/egg-init) 脚手架实现.
