#!/usr/bin/env node

const path = require('path');
const assert = require('assert');
const program = require('commander');
const chalk = require('chalk');
const _ = require('lodash.get');
const inquirer = require('inquirer');
const utils = require('../lib/utils');
const builder = require('../lib/builder');
const command = require('../lib/command');
const baseDir = process.cwd();

program
  .version('1.0.0')

  // .option('-i, --init', 'init framework [vue/react/weex] boilerplate')
  .option('-f, --filename [path]', 'webpack config file name')
  .option('-w, --watch', 'webpack watch and hot-update')
  .option('-m, --hash', 'webpack md5 hash js/css/image')
  .option('-c, --compress', 'webpack compress js/css/image')
  .option('-b, --build [option]', 'w(watch), m(hash) , c(compress), ex: wm/wc/mc/wmc');


program
  .command('init')
  .description('init webpack config or boilerplate')
  .action(() => {
    command.init();
  });

program
  .command('install')
  .description('npm install')
  .action(() => {
    builder.install();
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
        console.log(chalk.green(`==webpack ${options.node}:`), _(item, options.node));
      });
    } else {
      console.log(chalk.green('==webpack config:'), webpackConfig);
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
