'use strict';
const path = require('path');
const WebpackTool = require('webpack-tool');
const utils = require('../lib/utils');

exports.getWebpackConfig = cfg => {
  const { baseDir, cli } = cfg;
  const { filename = 'webpack.config.js' } = cli;
  const nativeWebpackConfigFile = path.isAbsolute(filename) ? filename : path.resolve(baseDir, filename);
  return require(nativeWebpackConfigFile);
};

exports.normalizeWebpackConfig = cfg => {
  const webpackConfig = exports.getWebpackConfig(cfg);
  if (cfg.cli.speed) {
    return utils.createSpeedWebpackConfig(webpackConfig);
  }
  return webpackConfig;
};

exports.build = cfg => {
  const webpackTool = new WebpackTool();
  const webpackConfig = exports.normalizeWebpackConfig(cfg);
  return webpackTool.build(webpackConfig)
};

exports.server = cfg => {
  const { port } = cfg.cli;
  const webpackTool = new WebpackTool({ port });
  const webpackConfig = exports.normalizeWebpackConfig(cfg);
  return webpackTool.server(webpackConfig)
};