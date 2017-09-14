#!/usr/bin/env node
'use strict';
const program = require('commander');
const chalk = require('chalk');
const _ = require('lodash.get');
const utils = require('../lib/utils');
const builder = require('../lib/builder');
const command = require('../lib/command');
const baseDir = process.cwd();

program
  .version('1.0.0')
  .option('-f, --filename [path]', 'webpack config file name')
  .option('-p, --port [port]', 'webpack server port')
  .option('-t, --type [type]', 'webpack build type: client, server, web, weex')
  .option('-w, --watch', 'webpack watch and hot-update')
  .option('-m, --hash', 'webpack md5 hash js/css/image')
  .option('-c, --compress', 'webpack compress js/css/image')
  .option('-b, --build [option]', 'w(watch), m(hash) , c(compress), ex: wm/wc/mc/wmc');


program
  .command('init')
  .option('-r, --registry [url]', 'npm registry, default https://registry.npmjs.org, you can taobao registry: https://registry.npm.taobao.org')
  .description('init webpack config or boilerplate for Vue/React/Weex')
  .action(options => {
    command.init(options);
  });

program
  .command('install')
  .option('-r, --registry [url]', 'npm registry, default https://registry.npmjs.org, you can taobao registry: https://registry.npm.taobao.org')
  .description('npm install')
  .action(options => {
    builder.install(options);
  });

program
  .command('print [env]')
  .option('-n, --node [key]', 'print webpack config info by config node key, example: [module/module.rules/plugins] and so on')
  .description('print webpack config, support print by env or config node key')
  .action((env, options) => {
    const config = utils.initWebpackConfig(program, { baseDir, env });
    const webpackConfig = builder.getWebpackConfig(config);
    if (options.node) {
      webpackConfig.forEach(item => {
        console.log(chalk.green(`easywebpack-cli: webpack ${program.type || ''} ${options.node} info:\r\n`), _(item, options.node));
      });
    } else {
      console.log(chalk.green(`easywebpack-cli: webpack ${program.type || ''} config info:\r\n`), webpackConfig);
    }
  });

program
  .command('build [env]')
  .description('webpack building')
  .action(env => {
    const config = utils.initWebpackConfig(program, { baseDir, env });
    builder.build(config);
  });

program
  .command('server [env]')
  .description('webpack building and start server')
  .action(env => {
    const config = utils.initWebpackConfig(program, { baseDir, env });
    builder.server(config);
  });

program
  .command('start [env]')
  .description('webpack building and start server')
  .action(env => {
    const config = utils.initWebpackConfig(program, { baseDir, env });
    builder.server(config);
  });

program.parse(process.argv);
