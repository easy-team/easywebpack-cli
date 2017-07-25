'use strict';
const path = require('path');
const assert = require('assert');
const shell = require('shelljs');
const chalk = require('chalk');
const utils = require('../lib/utils');
exports.getWebpackBuilder = config => {
  config = typeof config === 'string' ? require(config) : config;
  const frameworkPackageMapping = {
    vue: {
      pkg: 'easywebpack-vue'
    },
    weex: {
      pkg: 'easywebpack-weex'
    },
    react: {
      pkg: 'easywebpack-react'
    }
  };

  assert(config.framework, chalk.red('framework not set ,the framework only use vue/weex/react'));

  const build = frameworkPackageMapping[config.framework];

  let builder = utils.getInstallPackage(build.pkg, config.baseDir);
  if (!builder) {
    const command = shell.which('tnpm') ? 'tnpm' : 'npm';
    console.log(utils.log(`install [${build.pkg}] start`));
    const result = shell.exec(`${command} i ${build.pkg} -d`);
    if (result.code === 0) {
      console.log(utils.log(`install [ ${build.pkg} ] success`));
    }
    builder = utils.getInstallPackage(build.pkg, config.baseDir);
  }
  return builder;
};

exports.install = () =>{
  const command = shell.which('tnpm') ? 'tnpm' : 'npm';
  const result = shell.exec(`${command} i`);
  if (result.code === 0) {
    console.log(utils.log(`install success`));
  }
};

exports.getWebpackConfig = config => {
  const builder = exports.getWebpackBuilder(config);
  return builder.getWebpackConfig(config);
};

exports.build = config => {
  const builder = exports.getWebpackBuilder(config);
  const webpackConfigList = builder.getWebpackConfig(config);
  builder.build(webpackConfigList, config.done);
};

exports.server = config => {
  const builder = exports.getWebpackBuilder(config);
  const webpackConfigList = builder.getWebpackConfig(config);
  builder.server(webpackConfigList);
};