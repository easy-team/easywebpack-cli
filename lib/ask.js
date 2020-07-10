'use strict';
const chalk = require('chalk');
exports.boilerplateChoice = [
  {
    name: `Create ${chalk.green('Vue')} Application`,
    value: 'boilerplate-vue'
  },
  {
    name: `Create ${chalk.green('React')} Application`,
    value: 'boilerplate-react'
  },
  {
    name: `Create ${chalk.green('Egg + Vue')} Application`,
    value: 'boilerplate-egg-vue'
  },
  {
    name: `Create ${chalk.green('Egg + React')} Application`,
    value: 'boilerplate-egg-react'
  },
  {
    name: `Create ${chalk.green('NPM/HTML/Weex')} Boilerplate`,
    value: 'boilerplate-awesome'
  }
];

exports.boilerplateDetailChoice = {
  'boilerplate-awesome': [
    {
      name: `Create ${chalk.green('NPM TypeScript Lib')} Build Boilerplate`,
      value: 'easyjs-typescript-lib',
      pkgName: 'easyjs-typescript-lib',
      choices: ['name', 'description']
    },
    {
      name: `Create ${chalk.green('NPM Node Package Lib')} Boilerplate`,
      value: 'npm-package-code-template',
      pkgName: 'npm-package-code-template',
      choices: ['name', 'description'],
      run: 'npm test'
    },
    {
      name: `Create ${chalk.green('HTML')} Application`,
      value: 'easywebpack-multiple-html-boilerplate',
      pkgName: 'easywebpack-multiple-html-boilerplate',
      choices: ['name', 'description']
    },
    {
      name: `Create ${chalk.green('Weex')} Application`,
      value: 'easywebpack-weex-boilerplate',
      pkgName: 'easywebpack-weex-boilerplate',
      choices: ['name', 'description']
    }
  ],
  'boilerplate-vue': [
    {
      name: `Create ${chalk.green('Vue Single Page')} Application`,
      value: 'vue-boilerplate',
      pkgName: 'easywebpack-vue-boilerplate'
    },
    {
      name: `Create ${chalk.green('Vue Core')} Common Lib Build Boilerplate`,
      value: 'easyjs-vue-common-lib',
      pkgName: 'easyjs-vue-common-lib',
      choices: ['name', 'description']
    }
  ],
  'boilerplate-react': [
    {
      name: `Create ${chalk.green('React')} ${chalk.yellow('Webpack')} Application`,
      value: 'easy-react-app-template',
      pkgName: 'easy-react-app-template',
      choices: ['name', 'description']
    },
    {
      name: `Create ${chalk.green('React Simple')} Application`,
      value: 'easyjs-react-simple',
      pkgName: 'easyjs-react-simple',
      choices: ['name', 'description']
    },
    {
      name: `Create ${chalk.green('React Single Page')} Application`,
      value: 'react-boilerplate',
      pkgName: 'easywebpack-react-boilerplate',
      choices: ['name', 'description']
    },
    {
      name: `Create ${chalk.green('React TypeScript')} Application`,
      value: 'react-typescript-boilerplate',
      pkgName: 'easyjs-react-typescript',
      choices: ['name', 'description']
    },
    {
      name: `Create ${chalk.green('React Component')} NPM Boilerplate`,
      value: 'easyjs-react-component-lib',
      pkgName: 'easyjs-react-component-lib',
      choices: ['name', 'description']
    },
    {
      name: `Create ${chalk.green('React Core')} Common Lib Build Boilerplate`,
      value: 'easyjs-react-common-lib',
      pkgName: 'easyjs-react-common-lib',
      choices: ['name', 'description']
    }
  ],
  'boilerplate-egg-vue': [
    {
      name: `Create ${chalk.green('Egg + Vue')} ${chalk.yellow('Server Side Render')} Awesome Application`,
      value: 'egg-vue',
      pkgName: 'egg-vue-webpack-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + Vue')} ${chalk.yellow('Element Admin')} Application`,
      value: 'easy-element-admin',
      pkgName: 'easy-element-admin'
    },
    {
      name: `Create ${chalk.green('Egg + Vue + Nunjucks')} ${chalk.yellow('HTML')} Application`,
      value: 'egg-vue-html',
      pkgName: 'egg-vue-html-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + Vue + Nunjucks')} ${chalk.yellow('Asset Render')} Application`,
      value: 'egg-vue-asset',
      pkgName: 'egg-vue-asset-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + Vue + TypeScript')} ${chalk.yellow('Server Side Render')} Application`,
      value: 'egg-vue-typescript',
      pkgName: 'egg-vue-typescript-boilerplate'
    },
    {
      name: `Create ${chalk.green('Ves(Egg) Framework - Node Vue TypeScript Isomorphic Framework')} Application`,
      value: 'ves',
      pkgName: 'ves-admin'
    }
  ],
  'boilerplate-egg-react': [
    {
      name: `Create ${chalk.green('Egg + React')} ${chalk.yellow('Server Side Render')} Awesome Application`,
      value: 'egg-react',
      pkgName: 'egg-react-webpack-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + React + Nunjucks')} ${chalk.yellow('HTML')} Application`,
      value: 'egg-react-html-boilerplate',
      pkgName: 'egg-react-html-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + React + Nunjucks')} ${chalk.yellow('Asset Render')} Application`,
      value: 'egg-react-asset-boilerplate',
      pkgName: 'egg-react-asset-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + React + TypeScript')} ${chalk.yellow('Server Side Render')} Application`,
      value: 'egg-react-typescript',
      pkgName: 'egg-react-typescript-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + React + React Router + Redux + Ant Design')} ${chalk.yellow('Server Side Render')} Admin Application`,
      value: 'egg-react-spa',
      pkgName: 'egg-react-webpack-spa-boilerplate'
    },
    {
      name: `Create ${chalk.green('Egg + React + React Router + Redux + Ant Design')} ${chalk.yellow('Client Side Render')} Admin Application`,
      value: 'easy-react-admin',
      pkgName: 'easy-react-admin'
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
    type: 'list',
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
        name: 'none',
        value: null,
        checked: true
      },
      {
        name: 'npm',
        value: 'npm'
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
      }
    ]
  }
];