'use strict';
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
module.exports = baseDir => {
    const pkgFile = path.join(baseDir, 'package.json');
    const pkgJSON = require(pkgFile);
    const removePackages = [
      'babel-core',
      'babel-loader',
      'babel-eslint',
      'postcss-loader',
      'eslint-loader',
      'vue-template-compiler',
      'server-side-render-resource',
      'vue-server-renderer',
      'webpack-manifest-normalize',
      'html-webpack-plugin',
      'directory-named-webpack-plugin',
      'progress-bar-webpack-plugin',
      'webpack-manifest-resource-plugin'
    ];
    const upgradePackages = {
      'easywebpack-vue': {
        version: '^4.0.0'
      },
      'easywebpack-react': {
        version: '^4.0.0'
      },
      'easywebpack-html': {
        version: '^4.0.0'
      },
      'easywebpack-js': {
        version: '^4.0.0'
      },
      'egg-webpack': {
        version: '^4.0.0'
      },
      'ts-loader': {
        version: '^4.0.0'
      },
    };

    // remove and update dependencies
    Object.keys(pkgJSON.dependencies).forEach(name => {
      if(removePackages.indexOf(name) > -1) {
        delete pkgJSON.dependencies[name];
      }
      if(upgradePackages[name]) {
        pkgJSON.dependencies[name] = upgradePackages[name].version ;
      }
    });

    // remove and update devDependencies
    Object.keys(pkgJSON.devDependencies).forEach(name => {
      if(removePackages.indexOf(name) > -1) {
        delete pkgJSON.devDependencies[name];
      }
      if(upgradePackages[name]) {
        pkgJSON.devDependencies[name] = upgradePackages[name].version ;
      }
    });

    // remove npm lock file
    const packageLockFile = path.join(baseDir, 'package-lock.json');
    if(fs.existsSync(packageLockFile)) {
      fs.unlinkSync(packageLockFile);
    }

    // remove yarn lock file
    const yarnLockFile = path.join(baseDir, 'yarn.lock');
    if(fs.existsSync(yarnLockFile)) {
      fs.unlinkSync(yarnLockFile);
    }
    fs.writeFileSync(pkgFile, JSON.stringify(pkgJSON, null, 2));
    console.log(chalk.green('-- 1. upgrade package.json successfully'));
    console.log(chalk.red('-- 2. please reinstall the dependencies with npm install or yarn install'));
}