'use strict';
const assert = require('assert');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Download = require('./download');
const projectDir = process.cwd();

const typeChoice = [
  {
    name: `create ${chalk.green('NPM Package')} project boilerplate`,
    value: 'boilerplate-npm-package'
  },
  {
    name: `create ${chalk.green('Multiple Static HTML')} project boilerplate`,
    value: 'boilerplate-html'
  },
  {
    name: `create ${chalk.green('Vue/React Client Render')} project boilerplate`,
    value: 'boilerplate'
  },
  {
    name: `create ${chalk.green('Egg + Vue Server Side Render')} project boilerplate`,
    value: 'boilerplate-egg-vue'
  },
  {
    name: `create ${chalk.green('Egg + React Server Side Render')} project boilerplate`,
    value: 'boilerplate-egg-react'
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
  'boilerplate-egg-vue': [
    {
      name: `create ${chalk.green('Egg + Vue')} Server Side Sender ${chalk.green('Single Page Application')} project boilerplate`,
      value: 'egg-vue-spa',
      pkgName: 'egg-vue-webpack-spa-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + Vue')} Server Side Sender ${chalk.green('Multil Page Application')} project boilerplate`,
      value: 'egg-vue-multil',
      pkgName: 'egg-vue-webpack-mpa-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + Vue')} Server Side Sender ${chalk.green('Single And Multil Page Application')} project boilerplate`,
      value: 'egg-vue',
      pkgName: 'egg-vue-webpack-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + Vue + TypeScript')} Server Side Sender project poilerplate`,
      value: 'egg-vue-typescript',
      pkgName: 'egg-vue-typescript-boilerplate'
    }
  ],
  'boilerplate-egg-react': [
    {
      name: `create ${chalk.green('Egg + React')} Server Side Sender ${chalk.green('Single Page Application')} project boilerplate`,
      value: 'egg-react-spa',
      pkgName: 'egg-react-webpack-spa-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + React')} Server Side Sender ${chalk.green('Multil Page Application')} project boilerplate`,
      value: 'egg-react-multil',
      pkgName: 'egg-react-webpack-mpa-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + React')} Server Side Sender ${chalk.green('Single And Multil Page Application')} project boilerplate`,
      value: 'egg-react',
      pkgName: 'egg-react-webpack-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + React + TypeScript')} Server Side Sender project boilerplate`,
      value: 'egg-react-typescript',
      pkgName: 'egg-react-typescript-boilerplate'
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
    const download = new Download(options);
    const mapping = {
      'boilerplate-npm-package': 'npm-package-code-template',
      'boilerplate-html': 'easywebpack-multiple-html-boilerplate',
      'boilerplate-weex':'easywebpack-weex-boilerplate'
    };
    const directInitPkgName = mapping[type];
    if(directInitPkgName) {
      inquirer.prompt(boilerplateChoice).then(boilerplateAnswer => {
        download.init(projectDir, directInitPkgName, boilerplateAnswer, { 
          type,
          hide: true, 
          update: true 
        });
      });
      return;
    }
    const actionAsk = [
      {
        type: 'list',
        name: 'action',
        message: 'please choice the action?',
        choices: actionChoice[type]
      }
    ];
    inquirer.prompt(actionAsk).then(actionAnswer => {
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
        case 'boilerplate-egg-vue':
        case 'boilerplate-egg-react':
          inquirer.prompt(boilerplateChoice).then(boilerplateAnswer => {
            download.init(projectDir, pkgName, boilerplateAnswer, { type, action, hide: true, update: true });
          });
          break;
        case 'boilerplate-egg-typescript':
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

