#!/usr/bin/env node

'use strict';
const path = require('path');
const opn = require('opn');
const program = require('commander');
const chalk = require('chalk');
const _ = require('lodash.get');
const utils = require('../lib/utils');
const builder = require('../lib/builder');
const command = require('../lib/command');
const baseDir = process.cwd();
const shell = require('shelljs');
const pkg = require(path.join(__dirname, '../package.json'));

program
  .version(pkg.version)
  .option('-f, --filename [path]', 'webpack config file name')
  .option('-p, --port [port]', 'webpack server port')
  .option('-t, --type [type]', 'webpack build type: client, server, web, weex')
  .option('-w, --watch', 'webpack watch and hot-update')
  .option('-m, --md5', 'webpack md5 hash js/css/image')
  .option('-c, --compress', 'webpack compress js/css/image')
  .option('-b, --build [option]', 'w(watch), m(hash) , c(compress), ex: wm/wc/mc/wmc')
  .option('-d, --dll', 'only webpack dll config')
  .option('-b, --web', 'only webpack web config')
  .option('-s, --node', 'only webpack node config');


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
    const config = utils.initWebpackConfig(program, {
      baseDir,
      env
    });
    const option = utils.initOption(program);
    const webpackConfig = builder.getWebpackConfig(config, option);
    const webpackConfigList = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig];
    if (options.node) {
      webpackConfigList.forEach(item => {
        console.log(chalk.green(`easywebpack-cli: webpack ${program.type || item.target || ''} ${options.node} info:\r\n`), _(item, options.node));
      });
    } else {
      console.log(chalk.green('easywebpack-cli: webpack config info:\r\n'), webpackConfig);
    }
  });

program
  .command('dll [env]')
  .description('webpack dll build')
  .action(env => {
    if (!program.filename) {
      program.filename = 'webpack.dll.js';
    }
    const config = utils.initWebpackConfig(program, {
      baseDir,
      env,
      framework: 'dll'
    });
    const option = utils.initOption(program);
    builder.build(config, option);
  });

program
  .command('build [env]')
  .description('webpack building')
  .action(env => {
    const config = utils.initWebpackConfig(program, {
      baseDir,
      env
    });
    const option = utils.initOption(program);
    builder.build(config, option);
  });

program
  .command('server [env]')
  .description('webpack building and start server')
  .action(env => {
    const config = utils.initWebpackConfig(program, {
      baseDir,
      env
    });
    const option = utils.initOption(program);
    builder.server(config, option);
  });

program
  .command('start [env]')
  .description('webpack building and start server')
  .action(env => {
    const config = utils.initWebpackConfig(program, {
      baseDir,
      env
    });
    const option = utils.initOption(program);
    builder.server(config, option);
  });

program
  .command('clean')
  .description('webpack cache clean')
  .action(() => {
    const dir = utils.getCompileTempDir(baseDir);
    const result = shell.exec(`rm -rf ${dir}`);
    if (result.code === 0) {
      utils.log(`clean dir [ ${dir} ] success`);
    } else {
      utils.log(`clean dir [ ${dir} ] failed`);
    }
  });

program
  .command('open [dir]')
  .description('open webpack cache dir')
  .action(dir => {
    const filepath = dir ? dir : utils.getCompileTempDir(baseDir);
    opn(filepath);
    process.exit();
  });

program.parse(process.argv);
