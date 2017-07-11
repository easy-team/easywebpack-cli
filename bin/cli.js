#!/usr/bin/env node

const path = require('path');
const assert = require('assert');
const program = require('commander');
const chalk = require('chalk');
const utils = require('../lib/utils');

program
  .version('0.1.0')
  .option('-i, --init', 'init framework [vue/react/weex] boilerplate')
  .option('-f, --filename [path]', 'webpack custom config file name')
  .option('-b, --build [option]', 'webpack build')
  .option('-s, --server [option]', 'webpack build and start server')
  .parse(process.argv);

const baseDir = process.cwd();
const config = require(path.join(baseDir, program.filename || 'webpack.config.js'));
if(program.build){
  console.log('>>>>>build',program.build);
}
const builder = require('../lib/builder');
if (program.server) {
  builder.server(config);
} else {
  builder.build(config);
}