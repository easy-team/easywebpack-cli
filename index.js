'use strict';
Object.assign(exports, require('./lib/builder'));
exports.Action = require('./lib/action');
exports.Command = require('./lib/command');
exports.Download = require('./lib/download');
exports.WebpackTool = require('webpack-tool');
exports.utils = require('./lib/utils');
exports.webpack = exports.WebpackTool.webpack;
exports.merge = exports.WebpackTool.merge;
