'use strict';
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const _ = require('lodash.get');
const Archive = require('archive-tool');
const tool = require('node-tool-utils');
const Boilerplate = require('./init');
const builder = require('./builder');
const utils = require('./utils');

module.exports = class Action {
  constructor(command) {
    this.command = command;
    this.program = command.program;
    this.baseDir = command.baseDir;
  }

  init(boilerplate, options) {
    if (options.sync) {
      const filepath = path.resolve(__dirname, 'ask-sync.js');
      const url = options.sync === true ? process.env.EASY_INIT_ASK_URL || 'https://raw.githubusercontent.com/easy-team/easywebpack-cli/master/lib/ask.js' : options.sync;
      utils.request(url).then(res => {
        fs.writeFileSync(filepath, res.data);
        console.log(`${chalk.green('easy sync successfully, please run [easy init] again')}`);
      }).catch(err => {
        console.log(chalk.red('easy sync error:'), err);
      });
    } else {
      return new Boilerplate(boilerplate).init(options);
    }
  }

  install(options) {
    const config = utils.initWebpackConfig(this.program, {
      install: {
        check: true,
        npm: options.mode || 'npm'
      }
    });
    builder.getWebpackConfig(config);
  }

  dev(options) {
    const config = utils.initWebpackConfig(this.program, options);
    builder.server(config);
  }

  start(options) {
    const config = utils.initWebpackConfig(this.program, options);
    builder.server(config);
  }

  build(env, options) {
    const config = utils.initWebpackConfig(this.program, { env, cliDevtool : options.devtool}, { speed: options.speed });
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
  }

  dll(env, options) {
    const config = utils.initWebpackConfig(this.program, { env, framework: 'dll' }, { dll: true });
    builder.build(config);
  }

  /**
   * //error: zsh: no matches found
   * 1.在 ~/.zshrc 中加入：setopt no_nomatch 
   * 2.执行 source ~/.zshrc
   * @param {*} env 
   * @param {*} options 
   */
  print(env, options) {
    const config = utils.initWebpackConfig(this.program, { env });
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
  }

  server(options) {
    options.port = tool.getPort(options.port || 8888);
    tool.httpServer(options);
  }

  zip(options) {
    const config = utils.initArchiveOption(this.baseDir, this.program, options);
    const archive = new Archive(config);
    archive.zip();
  }

  tar(options) {
    const config = utils.initArchiveOption(this.baseDir, this.program, options);
    const archive = new Archive(config);
    archive.tar();
  }

  deploy(options) {
    console.log('doing.....');
  }

  upgrade(options) {
    if (options.babel) {
      require('./babel')(this.baseDir, options);
    } else {
      require('./upgrade')(this.baseDir, options);
    }
  }

  clean(dir) {
    if (dir === 'all') {
      utils.clearTempDir(this.baseDir);
      utils.clearManifest(this.baseDir);
      utils.clearBuildDir(this.baseDir);
    } else if (dir) {
      tool.rm(dir);
    } else {
      utils.clearTempDir(this.baseDir);
    }
  }

  kill(port) {
    tool.kill(port || '7001,9000,9001');
  }

  open(dir) {
    const filepath = dir ? dir : utils.getCompileTempDir(this.baseDir);
    tool.open(filepath);
    process.exit();
  }

  puppeteer(options) {
    const puppeteer = require('easy-puppeteer-html');
    return puppeteer.capture(options);
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
};
