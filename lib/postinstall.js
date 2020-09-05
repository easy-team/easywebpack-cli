'use strict';
const path = require('path');
const fs = require('fs');
const Logger = require('./logger');

class PostInstall {
  constructor(){
    this.logger = Logger.getLogger();
  }
  syncAskConfig() {
    const filepath = path.resolve(__dirname, 'ask-sync.js');
    const url = process.env.EASY_INIT_ASK_URL || 'https://easyjs.cn/easyjs/ask.js';
    const utils = require('./utils');
    utils.request(url).then(res => {
      fs.writeFileSync(filepath, res.data);
      this.logger.green('postInstall sync init config successfully');
    }).catch(err => {
      // this.logger.red(`postInstall sync init config error: ${err.toString()}`, 'red');
    });
  }
}

const postInstall = new PostInstall();
// postInstall.syncAskConfig();
