#!/usr/bin/env node

'use strict';
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const Archive = require('archive-tool');
const _ = require('lodash.get');
const tool = require('node-tool-utils');
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
  .option('-s, --size [option]', 'webpack build size analyzer tool, support size: analyzer and stats, default analyzer')
  .option('--dll', 'only webpack dll config')
  .option('--web', 'only webpack web config')
  .option('--node', 'only webpack node config')
  .option('--devtool [devtool]', 'webpack devtool config');

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
      install: {
        check: true,
        npm: options.mode || 'npm'
      }
    });
    const option = utils.initOption(program);
    builder.getWebpackConfig(config, option);
  });

program
  .command('upgrade')
  .option('--egg', 'use egg-bin and egg-scripts start application')
  .description('upgrade project package to latest version')
  .action(options => {
    require('../lib/upgrade')(baseDir, options);
  });

program
  .command('print [env]')
  .option('-n, --node [key]', 'print webpack config info by config node key, example: [module/module.rules/plugins] and so on')
  .description('print webpack config, support print by env or config node key')
  .action((env, options) => {
    const config = utils.initWebpackConfig(program, { env });
    const option = utils.initOption(program);
    const webpackConfig = builder.getWebpackConfig(config, option);
    const webpackConfigList = Array.isArray(webpackConfig) ? webpackConfig : ( webpackConfig ? [webpackConfig] : []);
    if (webpackConfigList.length) {
      if (options.node) {
        webpackConfigList.forEach(item => {
          console.log(chalk.green(`easywebpack-cli: webpack ${program.type || item.target || ''} ${options.node} info:\r\n`), _(item, options.node));
        });
      } else {
        console.log(chalk.green('easywebpack-cli: webpack config info:\r\n'), webpackConfig);
      }
    } else {
      console.warn(chalk.yellow('easywebpack-cli: webpack config is empty'));
    } 
  });

program
  .command('dll [env]')
  .description('webpack dll build')
  .action(env => {
    const config = utils.initWebpackConfig(program, { env, framework: 'dll' });
    const option = utils.initOption(program, { onlyDll: true }, config);
    builder.build(config, option);
  });

program
  .command('build [env]')
  .option('--devtool [devtool]', 'set webpack devtool')
  .option('--server [port]', 'start http server')
  .option('--speed', 'stat webpack build speed')
  .description('webpack building')
  .action((env, cfg) => {
    const config = utils.initWebpackConfig(program, { env, cliDevtool: cfg.devtool });
    // 编译完成, 启动 HTTP Server 访问静态页面
    if (cfg.server) {
      const done = config.done;
      config.done = (multiCompiler, compilation) => {
        done && done(multiCompiler, compilation);
        const compiler = multiCompiler.compilers.find (item => {
          return item.options.target === 'web';
        });
        if (compiler) { // 自动解析 output.path
          const dist = compiler.options.output.path;
          const port = cfg.server === true ? undefined : cfg.server;
          tool.httpServer({ dist, port });
        }
      };
    }
    const option = utils.initOption(program, cfg, config);
    builder.build(config, option);
  });

program
  .command('server')
  .option('-p, --port [port]', 'http server port')
  .option('-d, --dist [dist]', 'http server file dir')
  .option('-i, --index [index]', 'http server html index file name')
  .description('static file web http server')
  .action(options => {
    tool.httpServer(options);
  });

program
  .command('dev [env]')
  .description('start webpack dev server for develoment mode')
  .action(env => {
    const config = utils.initWebpackConfig(program, { env });
    const option = utils.initOption(program, {}, config);
    builder.server(config, option);
  });

program
  .command('start [env]')
  .description('start webpack dev server for develoment mode')
  .action(env => {
    const config = utils.initWebpackConfig(program, { env });
    const option = utils.initOption(program, {}, config);
    builder.server(config, option);
  });

program
  .command('zip')
  .option('--filename [filename]', 'archive zip file name')
  .option('--source [path]', 'archive files root path')
  .option('--target [path]', 'archive zip file path')
  .option('--deps', 'install dependencies into node_modules')
  .option('--mode [mode]', 'mode: npm, cnpm, tnpm, yarn and so on')
  .option('--registry [registry]', 'dependence install registry url')
  .option('--nodejs', 'install node into node_modules')
  .option('--alinode', 'install alinode into node_modules')
  .description('archive files to zip file')
  .action(option => {
    const config = utils.initArchiveOption(baseDir, program, option);
    const archive = new Archive(config);
    archive.zip();
  });

program
  .command('tar')
  .option('--filename [filename]', 'archive tar file name')
  .option('--source [path]', 'archive files root path')
  .option('--target [path]', 'archive zip file path')
  .option('--deps', 'install dependencies into node_modules')
  .option('--mode [mode]', 'mode: npm, cnpm, tnpm, yarn and so on')
  .option('--registry [registry]', 'dependence install registry url')
  .option('--node', 'install node into node_modules')
  .option('--alinode', 'install alinode into node_modules')
  .description('archive files to tar file')
  .action(option => {
    const config = utils.initArchiveOption(baseDir, program, option);
    const archive = new Archive(config);
    archive.tar();
  });

program
  .command('deploy')
  .description('upload file to deplay space')
  .action(option => {
    console.log('doing.....');
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
      tool.rm(dir);
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
  .description('kill port process')
  .action(port => {
    tool.kill(port || '7001,9000,9001');
  });

program.parse(process.argv);
