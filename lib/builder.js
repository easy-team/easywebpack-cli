'use strict';
const path = require('path');
const assert = require('assert');
const shell = require('shelljs');
const chalk = require('chalk');
const utils = require('../lib/utils');

exports.getWebpackBuilder = config => {
  const baseDir = process.cwd();
  if(!config){
    config = require(path.join(baseDir, 'webpack.config.js'));
  }
  config = Object.assign({}, { baseDir }, config);
  const frameworkPackageMapping = {
    vue: {
      pkg: 'easywebpack-vue',
      builderList: [
        {
          type: 'client',
          name: 'WebpackClientBuilder'
        },
        {
          type: 'server',
          name: 'WebpackServerBuilder'
        }
      ]
    },
    weex: {
      pkg: 'easywebpack-weex',
      builderList: [
        {
          type: 'weex',
          name: 'WebpackWeexBuilder'
        },
        {
          type: 'web',
          name: 'WebpackWebBuilder'
        }
      ]
    }
  };

  assert(config.framework, chalk.red('framework not set ,the framework only use vue/weex/react'));

  const build = frameworkPackageMapping[config.framework];

  let builder = utils.getInstallPackage(build.pkg, baseDir);
  if (!builder) {
    const command = shell.which('tnpm') ? 'tnpm' : 'npm';
    console.log(utils.log(`install [${build.pkg}] start`));
    const result = shell.exec(`${command} i ${build.pkg} -d`);
    if (result.code === 0) {
      console.log(utils.log(`install [ ${build.pkg} ] success`));
    }
    builder = utils.getInstallPackage(build.pkg, baseDir);
  }
  const list = build.builderList.map(item => {
    const WebpackBuilder = builder[item.name];
    return { type: item.type, builder: new WebpackBuilder(config) };
  });
  return Object.assign({}, builder, { list });
};

exports.getWebpackConfig = config => {
  const webpackBuilder = exports.getWebpackBuilder(config);
  return webpackBuilder.list.map(webpackBuilder => {
    return webpackBuilder.builder.create();
  });
};

exports.build = config => {
  const webpackBuilder = exports.getWebpackBuilder(config);
  const webpackConfigList = webpackBuilder.list.map(webpackBuilder => {
    return webpackBuilder.builder.create();
  });
  //console.log(webpackConfigList[0]);
  webpackBuilder.build(webpackConfigList, config.done);
};

exports.server = config => {
  const webpackBuilder = exports.getWebpackBuilder(config);
  const webpackConfigList = webpackBuilder.list.map(webpackBuilder => {
    return webpackBuilder.builder.create();
  });
  webpackBuilder.server(webpackConfigList);
};