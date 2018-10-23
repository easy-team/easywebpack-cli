'use strict';
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Archive = require('archive-tool');
const _ = require('lodash.get');
const tool = require('node-tool-utils');
const utils = require('./utils');
const builder = require('./builder');
const Boilerplate = require('./init');

module.exports = class Command {
  constructor() {
    this.baseDir = process.cwd();
    this.program = program;
    this.inquirer = inquirer;
    this.chalk = chalk;
    this.tool = tool;
    this.utils = utils;
    this.builder = builder;
    this.boilerplate = {};
    this.commands = ['init', 'install', 'dev', 'start', 'build', 'debug', 'test', 'cov', 'add', 'print', 'server', 'dll', 'zip', 'tar', 'deploy', 'clean', 'open', 'kill'];
  }

  version() {
    const pkg = require(path.resolve(__dirname, '../package.json'));
    this.program.version(pkg.version);
  }

  option() {
    this.program
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
      .option('--devtool [devtool]', 'webpack devtool config')
      .option('--webpack', 'support native webpack dev and build');
  }

  init() {
    this.program
      .command('init')
      .option('-r, --registry [url]', 'npm registry, default https://registry.npmjs.org, you can taobao registry: https://registry.npm.taobao.org')
      .description('init webpack config or boilerplate for Vue/React/Weex')
      .action(options => {
        new Boilerplate(this.boilerplate).init(options);
      });
  }

  install() {
    this.program
      .command('install')
      .option('--mode [mode]', 'mode: npm, cnpm, tnpm, yarn and so on')
      .description('dynamic install easywebpack missing npm module')
      .action(options => {
        const config = utils.initWebpackConfig(this.program, {
          install: {
            check: true,
            npm: options.mode || 'npm'
          }
        });
        builder.getWebpackConfig(config);
      });
  }

  dev() {
    this.program
      .command('dev [env]')
      .description('start webpack dev server for develoment mode')
      .action(env => {
        const config = utils.initWebpackConfig(this.program, {
          env
        });
        builder.server(config);
      });
  }

  debug() {
    // console.log(chalk.yellow('[debug] command not implemented'));
  }

  test() {
    // console.log(chalk.yellow('[test] command not implemented'));
  }

  cov() {
    // console.log(chalk.yellow('[cov] command not implemented'));
  }

  add() {
    // console.log(chalk.yellow('[add] command not implemented'));
  }

  start() {
    this.program
      .command('start [env]')
      .description('start webpack dev server for develoment mode')
      .action(env => {
        const config = utils.initWebpackConfig(this.program, {
          env
        });
        builder.server(config);
      });
  }

  build() {
    this.program
      .command('build [env]')
      .option('--devtool [devtool]', 'set webpack devtool')
      .option('--server [port]', 'start http server')
      .option('--speed', 'stat webpack build speed')
      .description('webpack building')
      .action((env = 'prod', options) => {
        const config = utils.initWebpackConfig(this.program, {
          env,
          cliDevtool: options.devtool
        }, {
          speed: options.speed
        });
        // 编译完成, 启动 HTTP Server 访问静态页面
        if (options.server) {
          const done = config.config.done;
          config.config.done = (multiCompiler, compilation) => {
            done && done(multiCompiler, compilation);
            const compiler = multiCompiler.compilers.find(item => {
              return item.options.target === 'web';
            });
            if (compiler) { // 自动解析 output.path
              const dist = compiler.options.output.path;
              const port = options.server === true ? undefined : options.server;
              tool.httpServer({
                dist,
                port
              });
            }
          };
        }
        builder.build(config);
      });
  }

  print() {
    this.program
      .command('print [env]')
      .option('-n, --node [key]', 'print webpack config info by config key, example: [module/module.rules/plugins] and so on(Deprecated)')
      .option('-k, --key [key]', 'print webpack config info by config key, example: [module/module.rules/plugins] and so on')
      .description('print webpack config, support print by env or config key')
      .action((env, options) => {
        const config = utils.initWebpackConfig(this.program, {
          env
        });
        const webpackConfig = builder.getWebpackConfig(config);
        const webpackConfigList = Array.isArray(webpackConfig) ? webpackConfig : (webpackConfig ? [webpackConfig] : []);
        if (webpackConfigList.length) {
          const key = options.key || options.node;
          if (key) {
            webpackConfigList.forEach(item => {
              console.log(chalk.green(`easywebpack-cli: webpack ${this.program.type || item.target || ''} ${key} info:\r\n`), _(item, key));
            });
          } else {
            console.log(chalk.green('easywebpack-cli: webpack config info:\r\n'), webpackConfig);
          }
        } else {
          console.warn(chalk.yellow('easywebpack-cli: webpack config is empty'));
        }
      });
  }

  server() {
    this.program
      .command('server')
      .option('-p, --port [port]', 'http server port')
      .option('-d, --dist [dist]', 'http server file dir')
      .option('-i, --index [index]', 'http server html index file name')
      .description('static file web http server')
      .action(options => {
        tool.httpServer(options);
      });
  }

  upgrade() {
    this.program
      .command('upgrade')
      .option('--egg', 'use egg-bin and egg-scripts start application')
      .description('upgrade project package to latest version')
      .action(options => {
        require('./upgrade')(this.baseDir, options);
      });
  }

  zip() {
    this.program
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
        const config = utils.initArchiveOption(this.baseDir, this.program, option);
        const archive = new Archive(config);
        archive.zip();
      });

  }
  tar() {
    this.program
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
        const config = utils.initArchiveOption(this.baseDir, this.program, option);
        const archive = new Archive(config);
        archive.tar();
      });
  }

  deploy() {
    this.program
      .command('deploy')
      .description('upload file to deplay space')
      .action(option => {
        console.log('doing.....');
      });
  }

  dll() {
    this.program
      .command('dll [env]')
      .description('webpack dll build')
      .action(env => {
        const config = utils.initWebpackConfig(program, { env, framework: 'dll' }, { dll: true });
        this.builder.build(config);
      });
  }

  clean() {
    this.program
      .command('clean [dir]')
      .description('webpack cache dir clean, if dir == "all", will clean cache dir and build dir')
      .action(dir => {
        if (dir === 'all') {
          utils.clearTempDir(this.baseDir);
          utils.clearManifest(this.baseDir);
          utils.clearBuildDir(this.baseDir);
        } else if (dir) {
          tool.rm(dir);
        } else {
          utils.clearTempDir(this.baseDir);
        }
      });
  }
  open() {
    this.program
      .command('open [dir]')
      .description('open webpack cache dir')
      .action(dir => {
        const filepath = dir ? dir : utils.getCompileTempDir(this.baseDir);
        tool.open(filepath);
        process.exit();
      });
  }

  kill() {
    this.program
      .command('kill [port]')
      .description('kill port process')
      .action(port => {
        tool.kill(port || '7001,9000,9001');
      });
  }

  register(cmd) {
    if (this.commands.some(key => { key === cmd })) {
      console.log(chalk.red(`The command ${cmd} already exists. Please overwrite the command directly.`));
    } else {
      this.commands.push(cmd);
    }
  }

  command() {
    this.commands.forEach(cmd => {
      if (this[cmd]) {
        this[cmd].apply(this);
      } else {
        console.log(chalk.red(`The command [${cmd}] is not implemented!`));
      }
    });
  }

  parse() {
    this.program.parse(process.argv);
  }

  run() {
    this.version();
    this.option();
    this.command();
    this.parse();
  }
}