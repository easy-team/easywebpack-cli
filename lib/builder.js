'use strict';
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const utils = require('../lib/utils');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BASE_SOLUTION = 'easywebpack';
const BASE_FRAMEWORKS = ['vue', 'react', 'html', 'js'];

exports.getFramework = (filepath = 'webpack.config.js', baseDir) => {
  const root = baseDir || process.cwd();
  const webpackConfigFilePath = path.isAbsolute(filepath) ? filepath : path.resolve(root, filepath);
  if (fs.existsSync(webpackConfigFilePath)) {
    const webpackConfig = require(filepath);
    const { framework } = webpackConfig;
    if (framework) {
      return framework;
    }
  }
  const pkgFile = path.join(root, 'package.json');
  const pkg = require(pkgFile);
  const { framework } = pkg.webpack || {};
  if (framework) {
    return framework;
  }
  return BASE_FRAMEWORKS.find(framework => {
    const key = `${BASE_SOLUTION}-${framework}`;
    return pkg.dependencies[key] || pkg.devDependencies[key];
  });
};

exports.getWebpackBuilder = (framework, baseDir) => {
  const pkgName = `${BASE_SOLUTION}-${framework}`
  let builder = utils.getInstallPackage(pkgName, baseDir);
  if (!builder) {
    const command = shell.which('tnpm') ? 'tnpm' : 'npm';
    utils.log(`install [${pkgName}] start`);
    const result = shell.exec(`${command} i ${pkgName} -d`);
    if (result.code === 0) {
      utils.log(`install [ ${pkgName} ] success`);
    }
    builder = utils.getInstallPackage(pkgName, baseDir);
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

exports.getEasy = cfg => {
  const { baseDir, cli } = cfg;
  const { filename } = cli;
  const framework = exports.getFramework(filename, baseDir);
  const easy = exports.getWebpackBuilder(framework, baseDir);
  const config = easy.getConfig(cfg.config, { cli, baseDir, framework });
  return { config, easy };
};

exports.getWebpackConfig = cfg => {
  const { config, easy } = exports.getEasy(cfg);
  if (cfg.cli.dll) {
    return easy.getDllWebpackConfig(config, cfg);
  }
  return easy.getWebpackConfig(config);
};

exports.createSpeedWebpackConfig = webpackConfig => {
  const smp = new SpeedMeasurePlugin({});
  return smp.wrap(webpackConfig);
}

exports.build = cfg => {
  const { config, easy } = exports.getEasy(cfg);
  const build = () => {
    let webpackConfigList = easy.getWebpackConfig(config);
    if (cfg.cli.speed) {
      if (Array.isArray(webpackConfigList)) {
        webpackConfigList = webpackConfigList.map(webpackConfig => {
          return exports.createSpeedWebpackConfig(webpackConfig);
        });
      } else {
        return exports.createSpeedWebpackConfig(webpackConfigList);
      }
    }
    easy.build(webpackConfigList, config, config.done);
  };

  // cli only build dll
  if (config && config.dll) {
    let dllWebpackConfig = easy.getDllWebpackConfig(config);
    if (dllWebpackConfig) {
      if (cfg.cli.speed) {
        dllWebpackConfig = exports.createSpeedWebpackConfig(webpackConfig);
      }
      // only build cli
      if (cfg.cli.dll) {
        return easy.build(dllWebpackConfig, {});
      }
      return easy.build(dllWebpackConfig, {}, () => {
        // fix build twice
        return build();
      });
    }
  }
  return build();
};

exports.server = cfg => {
  const { config, easy } = exports.getEasy(cfg);
  if (config && config.dll) {
    const dllWebpackConfig = easy.getDllWebpackConfig(config);
    return easy.build(dllWebpackConfig, {}, () => {
      const webpackConfigList = easy.getWebpackConfig(config);
      easy.server(webpackConfigList, config, config.done);
    });
  }
  const webpackConfigList = easy.getWebpackConfig(config);
  return easy.server(webpackConfigList, config, config.done);
};
