'use strict';
const inquirer = require('inquirer');
const Download = require('./download');
const ask = require('./ask');

module.exports = class Boilerplate {
  constructor(config = {}) {
    this.projectDir = process.cwd();
    this.boilerplateChoice = config.boilerplateChoice || ask.boilerplateChoice;
    this.boilerplateDetailChoice = config.boilerplateDetailChoice || ask.boilerplateDetailChoice;
    this.projectAskChoice = config.projectAskChoice || ask.projectAskChoice;
  }

  getBoilerplateInfo(name) {
    return this.boilerplateChoice.find(item => {
      return name === item.value;
    });
  }

  setBoilerplateInfo(boilerplateChoice) {
    this.boilerplateChoice = boilerplateChoice;
  }

  getBoilerplateDetailInfo(boilerplate, project) {
    const filterItems = this.boilerplateDetailChoice[boilerplate].filter(item => project === item.value);
    return filterItems.length > 0 ? filterItems[0] : null;
  }

  setBoilerplateDetailInfo(boilerplateDetailChoice) {
    this.boilerplateDetailChoice = boilerplateDetailChoice;
  }

  setProjectAskChoice(projectAskChoice) {
    this.projectAskChoice = projectAskChoice;
  }

  getProjectAskChoices(ranges){
    if (ranges === undefined) {
      return this.projectAskChoice;
    }
    return ranges.map(range => {
      return this.projectAskChoice.filter(choice => {
        return choice.name === range;
      })[0];
    });
  }

  init(options) {
    inquirer.prompt([{
      type: 'list',
      name: 'boilerplateName',
      message: 'please choose the boilerplate mode?',
      choices: this.boilerplateChoice
    }]).then(boilerplateAnswer => {
      const boilerplateName = boilerplateAnswer.boilerplateName;
      const boilerplateInfo = this.getBoilerplateInfo(boilerplateName);
      const choices = boilerplateInfo.choices;
      const download = new Download(options);
      if (this.boilerplateDetailChoice[boilerplateName]) {
        const boilerplateDetailAsk = [{
          type: 'list',
          name: 'project',
          message: 'please choose the boilerplate project mode?',
          choices: this.boilerplateDetailChoice[boilerplateName]
        }];
        inquirer.prompt(boilerplateDetailAsk).then(boilerplateDetailAnswer => {
          const project = boilerplateDetailAnswer.project;
          const bilerplateInfo = this.getBoilerplateDetailInfo(boilerplateName, project);
          const projectInfoChoice = this.getProjectAskChoices(choices);
          switch (boilerplateName) {
            case 'boilerplate-vue-react':
              inquirer.prompt(projectInfoChoice).then(projectInfoAnswer => {
                download.init(this.projectDir, bilerplateInfo, projectInfoAnswer);
              });
              break;
            case 'boilerplate-egg-vue':
            case 'boilerplate-egg-react':
              inquirer.prompt(projectInfoChoice).then(projectInfoAnswer => {
                download.init(this.projectDir, bilerplateInfo, projectInfoAnswer);
              });
              break;
            case 'boilerplate-egg-typescript':
              inquirer.prompt(projectInfoChoice).then(projectInfoAnswer => {
                download.init(this.projectDir, bilerplateInfo, projectInfoAnswer);
              });
              break;
            default:
              break;
          }
        });
      } else {
        const pkgName = boilerplateInfo.pkgName || boilerplateName;
        const projectInfoChoice = this.getProjectAskChoices(choices);
        inquirer.prompt(projectInfoChoice).then(projectInfoAnswer => {
          const specialBoilerplateInfo = { pkgName, run: boilerplateInfo.run };
          download.init(this.projectDir, specialBoilerplateInfo, projectInfoAnswer);
        });
      }
    });
  };
};