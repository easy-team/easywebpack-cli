'use strict';
const path = require('path');
const assert = require('assert');
const shell = require('shelljs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Download = require('./download');
const baseDir = process.cwd();

const typeChoice = [
  { name: `create ${chalk.green('easywebpack-cli')} config template`, value: 'cli' },
  { name: `create ${chalk.green('easywebpack')} build config template for ${chalk.blue('Vue/React/Weex')}`, value: 'build' },
  { name: `create ${chalk.green('client render')} project boilerplate for ${chalk.blue('Vue/React/Weex')}`, value: 'boilerplate' },
  { name: `create ${chalk.green('server side render')} project boilerplate for ${chalk.blue('Egg + Vue/React')}`, value: 'boilerplate-egg' }
];

const actionChoice = {
  cli: [
    { name: `create ${chalk.green('vue cli')} config template`, value: 'vue' },
    { name: `create ${chalk.green('react cli')} config template`, value: 'react' },
    { name: `create ${chalk.green('weex cli')} config template`, value: 'weex' }
  ],
  build: [
    { name: `create ${chalk.green('vue')} build config template`, value: 'vue', pkgName: 'easywebpack-vue-build-script' },
    { name: `create ${chalk.green('react')} build config template`, value: 'react', pkgName: 'easywebpack-react-build-script' },
    { name: `create ${chalk.green('weex')} build config template`, value: 'weex', pkgName: 'easywebpack-weex-build-script' }
  ],
  boilerplate: [
    { name: `create ${chalk.green('vue client render')} boilerplate`, value: 'vue', pkgName: 'easywebpack-vue-boilerplate' },
    { name: `create ${chalk.green('react client render')} boilerplate`, value: 'react', pkgName: 'easywebpack-react-boilerplate' },
    { name: `create ${chalk.green('weex native and weex web')} boilerplate`, value: 'weex', pkgName: 'easywebpack-weex-boilerplate' }
  ],
  'boilerplate-egg': [
    { name: `create ${chalk.green('egg + vue')} server side render boilerplate`, value: 'vue', pkgName: 'egg-vue-webpack-boilerplate' },
    { name: `create ${chalk.green('egg + react')} server side render boilerplate`, value: 'react', pkgName: 'egg-react-webpack-boilerplate' }
  ]
};

const getPkgName = (type, action) => {
  const filterItems = actionChoice[type].filter(item => {
    return action === item.value;
  });
  return filterItems.length > 0 ? filterItems[0].pkgName : null;
};

const boilerplateChoice = [
  {
    type: 'input',
    name: 'name',
    message: 'Please input project name:'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please input project description:'
  }
];

exports.init = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'please choice the create type?',
    choices: typeChoice
  }]).then(typeAnswer => {
    const type = typeAnswer.type;
    const actionAsk = [
      {
        type: 'list',
        name: 'action',
        message: 'please choice the action?',
        choices: actionChoice[type]
      }
    ];
    inquirer.prompt(actionAsk).then(actionAnswer => {
      const download = new Download();
      const action = actionAnswer.action;
      const pkgName = getPkgName(type, action);
      assert(pkgName, `invalid type: ${type} or action: action: ${action}`);
      switch (type) {
        case 'cli':
          const source = path.join(__dirname, `../template/cli/${action}/webpack.config.js`);
          const target = path.join(baseDir, 'webpack.config.js');
          shell.cp('-R', source, target);
          console.log(chalk.green(`>>create ${action} cli success: [${target}]`));
          break;
        case 'build':
          console.log(chalk.red('>>TODO:...'));
          inquirer.prompt(boilerplateChoice).then(boilerplateAnswer => {
            download.init(baseDir, pkgName, boilerplateAnswer, { type, action, dir: 'build'})
          });
          break;
        case 'boilerplate':
          inquirer.prompt(boilerplateChoice).then(boilerplateAnswer => {
            download.init(baseDir, pkgName, boilerplateAnswer, { type, action})
          });
          break;
        case 'boilerplate-egg':
          inquirer.prompt(boilerplateChoice).then(boilerplateAnswer => {
            download.init(baseDir, pkgName, boilerplateAnswer, { type, action})
          });
          break;
      }
    });
  });
};

