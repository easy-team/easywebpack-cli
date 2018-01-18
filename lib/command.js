'use strict';
const assert = require('assert');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Download = require('./download');
const projectDir = process.cwd();

const typeChoice = [
  {
    name: `create ${chalk.green('Multiple Static HTML')} project boilerplate`,
    value: 'boilerplate-html'
  },
  {
    name: `create ${chalk.green('Client Render')} project boilerplate for ${chalk.blue('Vue/React')}`,
    value: 'boilerplate'
  },
  {
    name: `create ${chalk.green('Egg Server Side Render')} project boilerplate for ${chalk.blue('Vue/React')}`,
    value: 'boilerplate-egg'
  },
  {
    name: `create ${chalk.green('Egg + TypeScript Server Side Render')} project boilerplate for ${chalk.blue('Vue/React')}`,
    value: 'boilerplate-egg-typescript'
  },
  {
    name: `create ${chalk.green('Weex Native and Weex Web')} project boilerplate for ${chalk.blue('Weex + Vue')}`,
    value: 'boilerplate-weex'
  },
  {
    name: `create ${chalk.green('easywebpack')} build config template for ${chalk.blue('Vue/React/Weex')}`,
    value: 'build'
  },
  { name: `create ${chalk.green('easywebpack-cli')} config template`, value: 'cli' }
];

const actionChoice = {
  cli: [
    { name: `create ${chalk.green('vue cli')} config template`, value: 'vue', pkgName: 'easywebpack-cli-template' },
    { name: `create ${chalk.green('react cli')} config template`, value: 'react', pkgName: 'easywebpack-cli-template' },
    { name: `create ${chalk.green('weex cli')} config template`, value: 'weex', pkgName: 'easywebpack-cli-template' }
  ],
  build: [
    {
      name: `create ${chalk.green('Vue')} build config template`,
      value: 'vue',
      pkgName: 'easywebpack-cli-template'
    },
    {
      name: `create ${chalk.green('React')} build config template`,
      value: 'react',
      pkgName: 'easywebpack-cli-template'
    },
    {
      name: `create ${chalk.green('Weex Native and Weex Web')} project boilerplate`,
      value: 'weex',
      pkgName: 'easywebpack-cli-template'
    }
  ],
  boilerplate: [
    {
      name: `create ${chalk.green('Vue Client Render')} project boilerplate`,
      value: 'vue',
      pkgName: 'easywebpack-cli-template'
    },
    {
      name: `create ${chalk.green('React Client Render')} project boilerplate`,
      value: 'react',
      pkgName: 'easywebpack-cli-template'
    }
  ],
  'boilerplate-egg': [
    {
      name: `create ${chalk.green('Egg + Vue')} Server Side Sender project boilerplate`,
      value: 'vue',
      pkgName: 'egg-vue-webpack-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + React')} Server Side Sender project boilerplate`,
      value: 'react',
      pkgName: 'egg-react-webpack-boilerplate'
    }
  ],
  'boilerplate-egg-typescript': [
    {
      name: `create ${chalk.green('Egg + TypeScript + Vue')} Server Side Sender project poilerplate`,
      value: 'vue',
      pkgName: 'egg-vue-typescript-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + TypeScript + React')} Server Side Sender project boilerplate`,
      value: 'react',
      pkgName: 'egg-react-typescript-boilerplate'
    }
  ],
  'boilerplate-html': [
    {
      name: `create ${chalk.green('Multiple Static Html')} boilerplate`,
      value: 'html',
      pkgName: 'easywebpack-multiple-html-boilerplate'
    }
  ],
  'boilerplate-weex': [
    {
      name: `create ${chalk.green('Weex Native and Weex Web')} project boilerplate`,
      value: 'weex',
      pkgName: 'easywebpack-weex-boilerplate'
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
    message: 'please choice the create project type?',
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
        case 'boilerplate-egg-typescript':
          inquirer.prompt(boilerplateChoice).then(boilerplateAnswer => {
            download.init(projectDir, pkgName, boilerplateAnswer, { type, action, hide: true, update: true });
          });
          break;
        case 'boilerplate-html':
          inquirer.prompt(boilerplateChoice).then(boilerplateAnswer => {
            download.init(projectDir, pkgName, boilerplateAnswer, { type, action, hide: true, update: true });
          });
          break;
        case 'boilerplate-weex':
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

