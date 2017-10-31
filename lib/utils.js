'use strict';
const chalk = require('chalk');
const path = require('path');
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
  getInstallPackage(name, baseDir) {
    const pkg = baseDir ? path.join(baseDir, 'node_modules', name) : name;
    try {
      return require(pkg);
    } catch (e) {
      return null;
    }
  },
  initWebpackConfig(program, option) {
    const baseDir = option.baseDir;
    const filepath = path.join(baseDir, program.filename || 'webpack.config.js');
    const config = Object.assign({}, require(filepath), option);
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
    if(config.type === 'client'){
      if(!config.plugins){
        config.plugins = {};
      }
      if(config.plugins.buildfile === undefined){
        config.plugins.buildfile = false;
      }
      if(config.plugins.manifest === undefined){
        config.plugins.manifest = false;
      }
    }
    return config;
  },
  log(info) {
    console.log(chalk.blue(`[easywebpack-cli]:${chalk.green(info)}`));
  }
};
