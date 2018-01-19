#!/usr/bin/env node

'use strict';
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const _ = require('lodash.get');
const tool = require('../lib/tool');
const utils = require('../lib/utils');
const builder = require('../lib/builder');
const command = require('../lib/command');
const baseDir = process.cwd();
const pkg = require(path.join(__dirname, '../package.json'));

program
  .version(pkg.version)
  .option('-f, --filename [path]', 'webpack config file path')
  .option('-p, --port [port]', 'webpack server port')
  .option('-t, --type [type]', 'webpack build type: client, server, web, weex')
  .option('-w, --watch', 'webpack watch and hot-update')
  .option('-m, --md5', 'webpack md5 hash js/css/image')
  .option('-c, --compress', 'webpack compress js/css/image')
  .option('-b, --build [option]', 'w(watch), m(hash) , c(compress), ex: wm/wc/mc/wmc')
  .option('-s, --size [option]', 'ebpack build size analyzer tool, support size: analyzer and stats, default analyzer')
  .option('--dll', 'only webpack dll config')
  .option('--web', 'only webpack web config')
  .option('--node', 'only webpack node config');


program
  .command('init')
  .option('-r, --registry [url]', 'npm registry, default https://registry.npmjs.org, you can taobao registry: https://registry.npm.taobao.org')
  .description('init webpack config or boilerplate for Vue/React/Weex')
  .action(options => {
    command.init(options);
  });

program
  .command('install')
  .option('--mode [mode]', 'mode: npm, cnpm, tnpm, yarn and so on')
  .description('dynamic install easywebpack missing npm module')
  .action(options => {
    const config = utils.initWebpackConfig(program, {
      baseDir,
      install: {
        check: true,
        npm: options.mode || 'npm'
      }
    });
    const option = utils.initOption(program);
    builder.getWebpackConfig(config, option);
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
    const config = utils.initWebpackConfig(program, {
      baseDir,
      env,
      framework: 'dll'
    });
    const option = utils.initOption(program, { onlyDll: true });
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
  .command('clean [dir]')
  .description('webpack cache dir clean, if dir == "all", will clean cache dir and build dir')
  .action(dir => {
    if (dir === 'all') {
      utils.clearTempDir(baseDir);
      utils.clearManifest(baseDir);
      utils.clearBuildDir(baseDir);
    } else if (dir) {
      utils.rm(dir);
    } else {
      utils.clearTempDir(baseDir);
    }
  });

program
  .command('open [dir]')
  .description('open webpack cache dir')
  .action(dir => {
    const filepath = dir ? dir : utils.getCompileTempDir(baseDir);
    tool.open(filepath);
    process.exit();
  });

// lsof -i tcp:7001 | grep LISTEN | awk \'{print $2}\' | xargs kill -9
program
  .command('kill [port]')
  .description('kill port process, default will kill 7001, 9000, 9001')
  .action(port => {
    tool.kill(port || '7001,9000,9001');
  });

program.parse(process.argv);
