'use strict';
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const os = require('os');
const tool = require('node-tool-utils');
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

  initWebpackConfig(program, option = {}, cliConfig = {}) {
    const baseDir = option.baseDir || process.cwd();
    const { filename, port, framework, type, devtool, size, watch, build, hash, compress, dll, web, node } = program;
    const target = web ? 'web' : (node ? 'node' : undefined);
    const cli = Object.assign({}, { filename, dll, web, node }, cliConfig);
    const config = Object.assign({ }, { port, framework, target, type, devtool, cli }, option);

    const cfg = {
      baseDir,
      config, // custom webpack config for easywebpack
      cli, // easywebpack cli config
      webpack: {} // native webpack config for webpack
    };

    cfg.config.baseDir = baseDir;
    cfg.config.plugins = cfg.config.plugins || {};
    
    if (cfg.config.port) {
      cfg.config.debugPort = cfg.config.debugPort || cfg.config.port - 1;
    }

    if (watch || (build && build.indexOf('w') > -1)) {
      cfg.config.hot = true;
    }

    if (hash || (build && (build.indexOf('h') > -1 || build.indexOf('m') > -1))) {
      cfg.config.hash = true;
    }

    if (this.isString(cfg.config.devtool)) {
      cfg.config.cliDevtool = true; // high
    }

    if (size) {
      if (size === 'stats' && !cfg.config.plugins.stats) {
        cfg.config.plugins.stats = true;
      } else if (!config.plugins.analyzer) {
        cfg.config.plugins.analyzer = true;
      }
    }

    if (compress || (build && build.indexOf('c') > -1)) {
      if (this.isUdefined(config.miniJs)) {
        cfg.config.miniJs = true;
      }
      if (this.isUdefined(config.miniCss)) {
        cfg.config.miniCss = true;
      }
      if (this.isUdefined(config.miniImage)) {
        cfg.config.miniImage = true;
      }
    }

    return cfg;
  },

  clearTempDir(baseDir) {
    const cacheDir = this.getCompileTempDir(baseDir);
    tool.rm(cacheDir);
  },

  clearManifest(baseDir) {
    const manifestDir = path.join(baseDir, 'config');
    const manifestFile = path.join(manifestDir, 'manifest.json')
    tool.rm(manifestFile);
  },

  clearBuildDir(baseDir) {
    const buildDir = path.join(baseDir, 'public');
    tool.rm(buildDir);
  },

  /* istanbul ignore next */
  log(info) {
    /* istanbul ignore next */
    console.log(chalk.blue(`[easywebpack-cli]:${chalk.green(info)}`));
  }
};