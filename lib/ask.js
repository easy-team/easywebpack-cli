'use strict';
const chalk = require('chalk');
exports.boilerplateChoice = [
  {
    name: `create ${chalk.green('Vue/React Client Render')} project boilerplate`,
    value: 'boilerplate-vue-react'
  },
  {
    name: `create ${chalk.green('Egg + Vue')} project boilerplate`,
    value: 'boilerplate-egg-vue'
  },
  {
    name: `create ${chalk.green('Egg + React')} project boilerplate`,
    value: 'boilerplate-egg-react'
  },
  {
    name: `create ${chalk.green('Weex')} project boilerplate for ${chalk.blue('Weex + Vue')}`,
    value: 'easywebpack-weex-boilerplate'
  },
  {
    name: `create ${chalk.green('HTML')} project boilerplate`,
    value: 'easywebpack-multiple-html-boilerplate'
  },
  {
    name: `create ${chalk.green('NPM')} package project boilerplate`,
    value: 'npm-package-code-template',
    choices: ['name', 'description', 'npm'],
    run: 'npm test'
  }
];

exports.boilerplateDetailChoice = {
  'boilerplate-vue-react': [
    {
      name: `create ${chalk.green('Vue Client Render')} project boilerplate`,
      value: 'vue-client',
      pkgName: 'easywebpack-cli-template',
      sourceDir: 'boilerplate/vue'
    },
    {
      name: `create ${chalk.green('React Client Render')} project boilerplate`,
      value: 'react-client',
      pkgName: 'easywebpack-cli-template',
      sourceDir: 'boilerplate/react'
    }
  ],
  'boilerplate-egg-vue': [
    {
      name: `create ${chalk.green('Egg + Vue')} ${chalk.green('Single Page Application')} project boilerplate`,
      value: 'egg-vue-spa',
      pkgName: 'egg-vue-webpack-spa-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + Vue')} ${chalk.green('Multil Page Application')} project boilerplate`,
      value: 'egg-vue-multil',
      pkgName: 'egg-vue-webpack-mpa-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + Vue')} ${chalk.green('Single And Multil Page Application')} project boilerplate`,
      value: 'egg-vue',
      pkgName: 'egg-vue-webpack-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + Vue + TypeScript')} project poilerplate`,
      value: 'egg-vue-typescript',
      pkgName: 'egg-vue-typescript-boilerplate'
    }
  ],
  'boilerplate-egg-react': [
    {
      name: `create ${chalk.green('Egg + React')} ${chalk.green('Single Page Application')} project boilerplate`,
      value: 'egg-react-spa',
      pkgName: 'egg-react-webpack-spa-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + React')} ${chalk.green('Multil Page Application')} project boilerplate`,
      value: 'egg-react-multil',
      pkgName: 'egg-react-webpack-mpa-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + React')} ${chalk.green('Single And Multil Page Application')} project boilerplate`,
      value: 'egg-react',
      pkgName: 'egg-react-webpack-boilerplate'
    },
    {
      name: `create ${chalk.green('Egg + React + TypeScript')} project boilerplate`,
      value: 'egg-react-typescript',
      pkgName: 'egg-react-typescript-boilerplate'
    }
  ]
};

exports.projectAskChoice = [
  {
    type: 'input',
    name: 'name',
    message: 'Please input project name:'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please input project description:'
  },
  {
    type: 'checkbox',
    name: 'style',
    message: 'Please choose css style:',
    choices: [
      {
        name: 'css',
        value: null,
        checked: true
      },
      {
        name: 'sass',
        value: 'scss'
      },
      {
        name: 'less',
        value: 'less'
      },
      {
        name: 'stylus',
        value: 'stylus'
      }
    ]
  },
  {
    type: 'list',
    name: 'npm',
    message: 'Please choose the way to install dependency:',
    choices: [
      {
        name: 'npm',
        value: 'npm',
        checked: true
      },
      {
        name: 'yarn',
        value: 'yarn'
      },
      {
        name: 'cnpm',
        value: 'cnpm'
      },
      {
        name: 'tnpm',
        value: 'tnpm'
      },
      {
        name: 'none',
        value: null
      }
    ]
  }
];