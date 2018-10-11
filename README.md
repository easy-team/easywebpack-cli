# easywebpack-cli

<div align="center">
  <a href="https://www.yuque.com/easy-team" target="_blank">
    <img width="200" height="200" src="/doc/easywebpack-logo.png">
  </a>
</div>  
<br>
 

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/easywebpack-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/easywebpack-cli
[travis-image]: https://img.shields.io/travis/easy-team/easywebpack-cli.svg?style=flat-square
[travis-url]: https://travis-ci.org/easy-team/easywebpack-cli
[codecov-image]: https://codecov.io/gh/easy-team/easywebpack-cli/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/easy-team/easywebpack-cli
[david-image]: https://img.shields.io/david/easy-team/easywebpack-cli.svg?style=flat-square
[david-url]: https://david-dm.org/easy-team/easywebpack-cli
[download-image]: https://img.shields.io/npm/dm/easywebpack-cli.svg?style=flat-square
[download-url]: https://npmjs.org/package/easywebpack-cli



A Powerful Cross-platform Webpack CLI Tool


## Installation

```bash
$ npm i easywebpack-cli -g
```

## Features

- ✔︎ Provide easywebpack and webapck development and build capabilities
- ✔︎ Provide multiple types of project initialization, such as React, Vue, Egg projects
- ✔︎ Provide multiple types of project builds, such as React, Vue, Egg, Weex projects
- ✔︎ Provide webpack basic development and build capabilities, such as dev server, hot-reload, typescript, dll
- ✔︎ Enhance Webpack-based development and build capabilities, such as build speed, build size capabilities
- ✔︎ Provide [easywebpack](https://github.com/easy-team/easywebpack) solution development and build capabilities
- ✔︎ Built-in normal development commands, such easy clean, easy open, easy kill, easy server

## Documents

- [Webpack Solution](https://github.com/easy-team/easywebpack)
- [Vue Single Application](https://github.com/easy-team/easywebpack-vue)
- [React Single Application](https://github.com/easy-team/easywebpack-react)
- [Vue Server Side Render](https://www.yuque.com/easy-team/ves)
- [React Server Side Render](https://www.yuque.com/easy-team/res)
- [Weex Application](https://github.com/easy-team/easywebpack-weex)

## Command

Support easywebpack and webpack modes，default easywebpack mode, you can specify the wepback build mode by `--webpack`. Default read `${root}/webpack.config.js` webpack config file.

- easywebpack mode: use easywebpack webpack config
- Webpack mode: use native webpack config

```bash
easy -h
```

Usage: easy [command] [options]

  Options:

    -V, --version          output the version number
    -f, --filename [path]  webpack config file path
    -p, --port [port]      webpack server port
    -s, --size [option]    webpack build size analyzer tool, support size: analyzer and stats, default analyzer
    --dll                  only webpack dll config
    --web                  only webpack web config
    --node                 only webpack node config
    --speed                stat webpack build speed
    --devtool [devtool]    webpack devtool config
    -h, --help             output usage information

  Commands:

    init [options]         init webpack config or boilerplate for Vue/React/Weex
    install [options]      dynamic install easywebpack missing npm module
    upgrade [options]      upgrade project package to latest version
    print [options] [env]  print webpack config, support print by env or config node key
    dll [env]              webpack dll build
    build [options] [env]  webpack building
    server [options]       static file web http server
    dev [env]              start webpack dev server for develoment mode
    start [env]            start webpack dev server for develoment mode
    zip [options]          archive files to zip file
    tar [options]          archive files to tar file
    deploy                 upload file to deplay space
    clean [dir]            webpack cache dir clean, if dir == "all", will clean cache dir and build dir
    open [dir]             open webpack cache dir
    kill [port]            kill port process, default will kill 7001, 9000, 9001


### Project Initialization

- easy init

> step one:

![step one](/doc/easy-init-step-one.png)

> step two:

![step two](/doc/easy-init-step-two.png)

### Project Development

#### easywebpack 

- easy dev

- easy dev -f build/webpack.config.js

#### webpack

- easy dev --webpack

- easy dev -f build/webpack.config.js --webpack

### Project Building

#### easywebpack 

- easy build prod

- easy build -f build/webpack.config.js

#### webpack

- easy build -f build/webpack.config.js --webpack

### Clean Cache

```bash
easy clean
```

### Open Directory

```bash
easy open
```

### Kill Port

```bash
easy kill 7001
easy kill 7001,9000,9001
```

### Webpack Build Size

- webpack-bundle-analyzer

```bash
easy build -s 
```

- stats-webpack-plugin

```bash
easy build -s stats
```

### Webpack Build Speed

Use the plugin `speed-measure-webpack-plugin` for build speed analysis and count the time spent on each loader and plugin

```bash
easy build --speed
```

### Start Web HTTP Server

Use the plugin `node-http-server` for local directory compilation access, automatically find HTML files

- serve current dir

```bash
easy server
```

- serve specify port and directory

```bash
easy server -p 8888 -r dist
```

### Print Webpack Config Info

```bash
easy print -h
```

  Usage: print [env] [options]

    print webpack config, support print by env or config node key


  Options:

    -k, --key [name]  print webpack config info by config key name, example: [module/module.rules/plugins] and so on
    -h, --help        output usage information

- easy print -k module

- easy print dev -k entry

- easy print test -k module.rules

- easy print prod -k module.rules[0]

- easy print -k plugins

- easy print -k plugins[0]

- easy print -k output

- easy print -k resolve

## License

[MIT](LICENSE)
