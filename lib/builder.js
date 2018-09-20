'use strict';
const path = require('path');
const shell = require('shelljs');
const utils = require('../lib/utils');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

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
    },
    html: {
      pkg: 'easywebpack-html'
    },
    js: {
      pkg: 'easywebpack-js'
    },
    dll: {
      pkg: 'easywebpack'
    }
  };

  if (!config.framework) {
    const pkgFile = path.join(config.baseDir, 'package.json');
    const pkg = require(pkgFile);
    if (pkg.dependencies['egg-view-vue-ssr'] || pkg.dependencies['easywebpack-vue']) {
      config.framework = 'vue';
    } else if (pkg.dependencies['egg-view-react-ssr'] || pkg.dependencies['easywebpack-react']) {
      config.framework = 'react';
    } else if (config.template && pkg.dependencies['easywebpack-html']) {
      config.framework = 'html';
    } else {
      config.framework = 'js';
    }
  }
  const build = frameworkPackageMapping[config.framework];

  let builder = utils.getInstallPackage(build.pkg, config.baseDir);
  if (!builder) {
    const command = shell.which('tnpm') ? 'tnpm' : 'npm';
    utils.log(`install [${build.pkg}] start`);
    const result = shell.exec(`${command} i ${build.pkg} -d`);
    if (result.code === 0) {
      utils.log(`install [ ${build.pkg} ] success`);
    }
    builder = utils.getInstallPackage(build.pkg, config.baseDir);
  }
  return builder;
};

exports.install = options => {
  const registry = options.registry || 'https://registry.npmjs.org';
  const command = shell.which('tnpm') ? 'tnpm' : 'npm';
  const result = shell.exec(`${command} i --registry=${registry}`);
  if (result.code === 0) {
    utils.log('install success');
  }
};

exports.getWebpackConfig = (config, option = {}) => {
  const builder = exports.getWebpackBuilder(config);
  return builder.getWebpackConfig(config, option);
};

exports.build = (config, option = {}) => {
  const builder = exports.getWebpackBuilder(config);
  const build = () => {
    let webpackConfigList = builder.getWebpackConfig(config, option);
    if (option.speed) {
      if (Array.isArray(webpackConfigList)) {
        webpackConfigList = webpackConfigList.map(webpackConfig => {
          const smp = new SpeedMeasurePlugin({});
          return smp.wrap(webpackConfig);
        });
      } else {
        const smp = new SpeedMeasurePlugin({});
        webpackConfigList = smp.wrap(webpackConfigList);
      }
    }
    builder.build(webpackConfigList, config, config.done);
  };
  if (config && config.dll) {
    const dllWebpackConfig = builder.getDllWebpackConfig(config, option);
    if (dllWebpackConfig) {
      return builder.build(dllWebpackConfig, {}, () => {
        // fix build twice
        if(!option.onlyDll) {
          return build();
        }
      });
    }
  }
  return build();
};

exports.server = (config, option = {}) => {
  const builder = exports.getWebpackBuilder(config);
  if (config && config.dll) {
    const dllWebpackConfig = builder.getDllWebpackConfig(config, option);
    if (dllWebpackConfig) {
      return builder.build(dllWebpackConfig, {}, () => {
        const webpackConfigList = builder.getWebpackConfig(config, option);
        builder.server(webpackConfigList, config, config.done);
      });
    }
  }
  const webpackConfigList = builder.getWebpackConfig(config, option);
  return builder.server(webpackConfigList, config, config.done);
};
