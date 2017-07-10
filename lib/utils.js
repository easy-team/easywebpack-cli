'use strict';
const chalk = require('chalk');
const path = require('path');
module.exports = {
  getInstallPackage(name, baseDir){
    const pkg = baseDir ? path.join(baseDir, 'node_modules', name) : name;
    try {
      return require(pkg);
    } catch (e) {
      return null;
    }
  },
  log(info){
    console.log(chalk.blue('[easywebpack-cli]:' + chalk.green(info)));
  }
};