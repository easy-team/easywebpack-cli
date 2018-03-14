'use strict';
const os = require('os');
const fs = require('fs');
const shell = require('shelljs');
const opn = require('opn');
const kill = require('kill-port');
const path = require('path');

exports.rm = filepath => {
  const dirs = Array.isArray(filepath) ? filepath : [filepath];
  dirs.forEach(dir => {
    /* istanbul ignore next */
    if (os.platform() === 'win32') {
      exports.deleteFile(dir);
      console.log(`remove [ ${dir} ] success`);
    } else {
      const result = shell.exec(`rm -rf ${dir}`);
      if (result.code === 0) {
        console.log(`remove [ ${dir} ] success`);
      } else {
        /* istanbul ignore next */
        exports.deleteFile(dir);
      }
    }
  });
};

exports.deleteFile = filepath => {
  if (fs.existsSync(filepath)) {
    const files = fs.readdirSync(filepath);
    files.forEach((file, index) => {
      const curPath = path.join(filepath, file);
      if (fs.statSync(curPath).isDirectory()) {
        exports.deleteFile(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(filepath);
  }
}

/* istanbul ignore next */
exports.open = filepath => {
  opn(filepath);
};

/* istanbul ignore next */
exports.kill = function (port) {
  if (port) {
    const ports = port.split(',');
    ports.forEach(p => {
      kill(p).then(() => {
        console.log(`kill port ${p} success`);
      }).catch(() => {
        console.log(`kill port ${p} failed`);
      });
    });
  }
};