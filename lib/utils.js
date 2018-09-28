'use strict';
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const os = require('os');
const tool = require('./tool');
const httpserver = require('node-http-server');
const glob = require('glob');
module.exports = {

  isUdefined(value) {
    return value === undefined;
  },
  isFunction(value) {
    return typeof value === 'function';
  },
  isObject(value) {
    return typeof value === 'object';
  },
  isString(value) {
    return typeof value === 'string';
  },
  isBoolean(value) {
    return typeof value === 'boolean';
  },
  getCompileTempDir(baseDir, dir = '') {
    const root = path.join(os.tmpdir(), 'easywebpack');
    try {
      const pkgfile = path.join(baseDir || process.cwd(), 'package.json');
      const pkg = require(pkgfile);
      const project = pkg.name;
      return path.join(root, project, dir);
    } catch (e) {
      return root;
    }
  },
  getInstallPackage(name, baseDir) {
    const pkg = baseDir ? path.join(baseDir, 'node_modules', name) : name;
    try {
      return require(pkg);
    } catch (e) {
      return null;
    }
  },
  initArchiveOption(baseDir, program, option) {
    const config = {
      target: option.target || this.getCompileTempDir(baseDir)
    };
    if(option.filename) {
      config.filename = option.filename;
    }
    if(option.source) {
      config.source = option.source;
    }
    if(option.deps || option.mode || option.registry) {
      config.installDeps = {};
      if(option.mode) {
        config.installDeps.mode = option.mode;
      }
      if(option.registry) {
        config.installDeps.registry = option.registry;
      }
    }
    if(option.alinode) {
      config.installNode = {
        installAlinode: true
      }
    } else if(option.nodejs) {
      config.installNode = {
        installNode: true
      }
    }
    return config;
  },
  initOption(program, option = {}, config = {}) {
    const target = program.web ? 'web' : (program.node ? 'node' : undefined);
    return Object.assign({}, {
      speed: option.speed,
      onlyDll: program.dll,
      onlyWeb: program.web,
      onlyNode: program.node,
      onlyView: true,
      target
    }, option, { proxy: config.proxy });
  },
  initWebpackConfig(program, option = {}) {
    const config = {
      cli: true,
      baseDir: option.baseDir || process.cwd(),
      cliDevtool: option.cliDevtool,
      plugins: {}
    };
    if (!config.framework) {
      config.framework = option.framework;
    }
    if (option.install) {
      config.install = option.install;
    }
    if (option.env) {
      config.env = option.env;
    }
    if (program.type) {
      config.type = program.type;
    }
    if (program.port) {
      config.port = program.port;
    }
    if (config.port) {
      config.debugPort = config.debugPort || config.port - 1;
    }
    if (program.watch || (program.build && program.build.indexOf('w') > -1)) {
      config.hot = true;
    }
    if (program.hash || (program.build && program.build.indexOf('h') > -1) || (program.build && program.build.indexOf('m') > -1)) {
      config.hash = true;
    }
    if (program.devtool && this.isString(program.devtool)) {
      config.cliDevtool = true; // 高优先级
      config.devtool = program.devtool;
    }
    if (program.size) {
      if (program.size === 'stats' && !config.plugins.stats) {
        config.plugins.stats = true;
      } else if (!config.plugins.analyzer) {
        config.plugins.analyzer = true;
      }
    }
    if (program.compress || (program.build && program.build.indexOf('c') > -1)) {
      if (this.isUdefined(config.miniJs)) {
        config.miniJs = true;
      }
      if (this.isUdefined(config.miniCss)) {
        config.miniCss = true;
      }
      if (this.isUdefined(config.miniImage)) {
        config.miniImage = true;
      }
    }
    return config;
  },
  clearTempDir(baseDir) {
    const cacheDir = this.getCompileTempDir(baseDir);
    tool.rm(cacheDir);
  },
  clearManifest(baseDir) {
    const manifestDir = path.join(baseDir, 'config');
    const manifestFile = path.join(manifestDir, 'manifest.json')
    if (fs.existsSync(manifestFile)) {
      tool.rm(manifestFile);
    }
  },
  clearBuildDir(baseDir) {
    const buildDir = path.join(baseDir, 'public');
    if (fs.existsSync(buildDir)) {
      tool.rm(buildDir);
    }
  },

  /* istanbul ignore next */
  log(info) {
    /* istanbul ignore next */
    console.log(chalk.blue(`[easywebpack-cli]:${chalk.green(info)}`));
  },
  resolve(filename, baseDir) { 
    baseDir = baseDir || process.cwd();
    if (filename) {
      return path.isAbsolute(filename) ? filename : path.resolve(baseDir, filename);
    }
    return baseDir;
  },
  startHttpServer(cfg, callback) {
    const port = cfg.port || 8080;
    const root = this.resolve(cfg.dist);
    let index = cfg.index;
    if (!index) {
      const files = glob.sync('*.html', { cwd: root, root });
      if(files.length > 0) {
        index = files[0];
      }
    }
    const options = {
      port,
      root,
      server: {
        index
      }
    };
    httpserver.deploy(options, server => {
      const url = `http://127.0.0.1:${server.config.port}`;
      const host = tool.getHost(server.config.port);
      console.log(chalk.green(`Http server ${chalk.yellow(url)} or ${chalk.yellow(host)} is serve ${chalk.blue(root)}\r\n`));
      callback && callback(server);
    });
  }
};