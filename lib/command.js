'use strict';
const assert = require('assert');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Download = require('./download');
const projectDir = process.cwd();

const typeChoice = [
  { name: `create ${chalk.green('easywebpack-cli')} config template`, value: 'cli' },
  {
    name: `create ${chalk.green('easywebpack')} build config template for ${chalk.blue('Vue/React/Weex')}`,
    value: 'build'
  },
  {
    name: `create ${chalk.green('client render')} project boilerplate for ${chalk.blue('Vue/React/Weex')}`,
    value: 'boilerplate'
  },
  {
    name: `create ${chalk.green('server side render')} project boilerplate for ${chalk.blue('Egg + Vue/React')}`,
    value: 'boilerplate-egg'
  }
];

const actionChoice = {
  cli: [
    { name: `create ${chalk.green('vue cli')} config template`, value: 'vue', pkgName: 'easywebpack-cli-template' },
    { name: `create ${chalk.green('react cli')} config template`, value: 'react', pkgName: 'easywebpack-cli-template' },
    { name: `create ${chalk.green('weex cli')} config template`, value: 'weex', pkgName: 'easywebpack-cli-template' }
  ],
  build: [
    {
      name: `create ${chalk.green('vue')} build config template`,
      value: 'vue',
      pkgName: 'easywebpack-cli-template'
    },
    {
      name: `create ${chalk.green('react')} build config template`,
      value: 'react',
      pkgName: 'easywebpack-cli-template'
    },
    {
      name: `create ${chalk.green('weex')} build config template`,
      value: 'weex',
      pkgName: 'easywebpack-cli-template'
    }
  ],
  boilerplate: [
    {
      name: `create ${chalk.green('vue client render')} boilerplate`,
      value: 'vue',
      pkgName: 'easywebpack-cli-template'
    },
    {
      name: `create ${chalk.green('react client render')} boilerplate`,
      value: 'react',
      pkgName: 'easywebpack-cli-template'
    },
    {
      name: `create ${chalk.green('weex native and weex web')} boilerplate`,
      value: 'weex',
      pkgName: 'easywebpack-cli-template'
    }
  ],
  'boilerplate-egg': [
    {
      name: `create ${chalk.green('egg + vue')} server side render boilerplate`,
      value: 'vue',
      pkgName: 'egg-vue-webpack-boilerplate'
    },
    {
      name: `create ${chalk.green('egg + react')} server side render boilerplate`,
      value: 'react',
      pkgName: 'egg-react-webpack-boilerplate'
    }
  ]
};

const getPkgName = (type, action) => {
  const filterItems = actionChoice[type].filter(item => action === item.value);
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

exports.init = options => {
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
      const download = new Download(options);
      const action = actionAnswer.action;
      const pkgName = getPkgName(type, action);
      assert(pkgName, `invalid type: ${type} or action: action: ${action}`);
      switch (type) {
        case 'cli':
          download.init(projectDir, pkgName, {}, { type, action, baseDir: 'cli', framework: action, dir: false });
          break;
        case 'build':
          download.init(projectDir, pkgName, {}, { type, action, name: `easywebpack-${action}-build-script-template`, baseDir: 'build', framework: action, dir: 'build' });
          break;
        case 'boilerplate':
          inquirer.prompt(boilerplateChoice).then(boilerplateAnswer => {
            download.init(projectDir, pkgName, boilerplateAnswer, { type, action, baseDir: 'boilerplate', framework: action, hide: true, update: true });
          });
          break;
        case 'boilerplate-egg':
          inquirer.prompt(boilerplateChoice).then(boilerplateAnswer => {
            download.init(projectDir, pkgName, boilerplateAnswer, { type, action, hide: true, update: true });
          });
          break;
        default:
          break;
      }
    });
  });
};

