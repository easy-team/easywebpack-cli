'use strict';
const shell = require('shelljs');
const opn = require('opn');
const kill = require('kill-port');
exports.rm = filepath => {
  const dirs = Array.isArray(filepath) ? filepath : [filepath];
  dirs.forEach(dir => {
    const result = shell.exec(`rm -rf ${dir}`);
    if (result.code === 0) {
      console.log(`remove [ ${dir} ] success`);
    } else {
      console.log(`remove [ ${dir} ] failed`);
    }
  });
};

exports.open = filepath => {
  opn(filepath);
};

exports.kill = function(port) {
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

