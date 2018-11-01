'use strict';
const chalk = require('chalk');
exports.boilerplateChoice = [
  {
    name: `Create ${chalk.green('Vue')} Client Render Application`,
    value: 'boilerplate-vue'
  },
  {
    name: `Create ${chalk.green('React')} Client Render Application`,
    value: 'boilerplate-react'
  },
  {
    name: `Create ${chalk.green('Egg + Vue')} Server Side Render Application`,
    value: 'boilerplate-egg-vue'
  },
  {
    name: `Create ${chalk.green('Egg + React')} Server Side Render Application`,
    value: 'boilerplate-egg-react'
  },
  {
    name: `Create ${chalk.green('Weex')} Application for ${chalk.blue('Weex + Vue')}`,
    value: 'easywebpack-weex-boilerplate'
  },
  {
    name: `Create ${chalk.green('HTML')} Application`,
    value: 'easywebpack-multiple-html-boilerplate'
  },
  {
    name: `Create ${chalk.green('NPM')} package Application`,
    value: 'npm-package-code-template',
    choices: ['name', 'description', 'npm'],
    run: 'npm test'
  }
];

exports.boilerplateDetailChoice = {
  'boilerplate-vue': [
    {
      name: `Create ${chalk.green('Vue Single Page')} Application`,
      value: 'vue-boilerplate',
      pkgName: 'easywebpack-vue-boilerplate'
    }
  ],
  'boilerplate-react': [
    {
      name: `Create ${chalk.green('React Single Page')} Application`,
      value: 'react-boilerplate',
      pkgName: 'easywebpack-react-boilerplate'
    },
    {
      name: `Create ${chalk.green('React + AntD Single Page')} Application`,
      value: 'react-antd-boilerplate',
      pkgName: 'easywebpack-react-antd-boilerplate'
    }
  ],
  'boilerplate-egg-vue': [
    {
      name: `Create ${chalk.green('Egg + Vue')} ${chalk.green('Single Page')} Application`,
      value: 'egg-vue-spa',
      pkgName: 'egg-vue-webpack-spa-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + Vue')} ${chalk.green('Multil Page')} Application`,
      value: 'egg-vue-multil',
      pkgName: 'egg-vue-webpack-mpa-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + Vue')} ${chalk.green('Single And Multil Page')} Application`,
      value: 'egg-vue',
      pkgName: 'egg-vue-webpack-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + Vue + TypeScript')} Application`,
      value: 'egg-vue-typescript',
      pkgName: 'egg-vue-typescript-boilerplate'
    },
    {
      name: `Create ${chalk.green('Ves Framework - Node Vue TypeScript Isomorphic Framework')} Application`,
      value: 'ves',
      pkgName: 'ves-admin'
    }
  ],
  'boilerplate-egg-react': [
    {
      name: `Create ${chalk.green('Egg + React')} ${chalk.green('Single Page')} Application`,
      value: 'egg-react-spa',
      pkgName: 'egg-react-webpack-spa-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + AntD')} ${chalk.green('Single Page')} Application`,
      value: 'egg-react-antd',
      pkgName: 'egg-react-webpack-antd-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + React')} ${chalk.green('Multil Page')} Application`,
      value: 'egg-react-multil',
      pkgName: 'egg-react-webpack-mpa-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + React')} ${chalk.green('Single And Multil Page')} Application`,
      value: 'egg-react',
      pkgName: 'egg-react-webpack-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + React + TypeScript')} Application`,
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