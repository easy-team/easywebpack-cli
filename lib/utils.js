'use strict';
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const os = require('os');
const tool = require('./tool');
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
  getCompileTempDir(baseDir) {
    const root = `${os.tmpdir()}/easywebpack`;
    try {
      const pkgfile = path.join(baseDir || process.cwd(), 'package.json');
      const pkg = require(pkgfile);
      const project = pkg.name;
      return `${root}/${project}`;
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
  initOption(program, option) {
    const target = program.web ? 'web' : (program.node ? 'node' : undefined);
    return Object.assign({}, {
      onlyDll: program.dll,
      onlyWeb: program.web,
      onlyNode: program.node,
      onlyView: true,
      target
    }, option);
  },
  initWebpackConfig(program, option) {
    const filename = program.filename || 'webpack.config.js';
    const baseDir = option.baseDir;
    const filepath = path.isAbsolute(filename) ? filename : path.resolve(baseDir, filename);
    const config = require(filepath);
    config.cli = true;
    config.webpackConfigFile = filepath;
    if (!config.plugins) {
      config.plugins = {};
    }
    if (!config.baseDir) {
      config.baseDir = baseDir;
    }
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
    if (config.type === 'client') {
      if (config.plugins.buildfile === undefined) {
        config.plugins.buildfile = false;
      }
      if (config.plugins.manifest === undefined) {
        config.plugins.manifest = false;
      }
    }
    return config;
  },
  clearTempDir(baseDir) {
    const cacheDir = this.getCompileTempDir(baseDir);
    tool.rm(cacheDir);
  },
  clearManifest(baseDir) {
    const manifestDir = path.join(baseDir, 'config/manifest.json');
    if (fs.existsSync(manifestDir)) {
      tool.rm(manifestDir);
    }
  },
  clearBuildDir(baseDir) {
    const buildDir = path.join(baseDir, 'public');
    if (fs.existsSync(buildDir)) {
      tool.rm(buildDir);
    }
  },
  log(info) {
    console.log(chalk.blue(`[easywebpack-cli]:${chalk.green(info)}`));
  }
};