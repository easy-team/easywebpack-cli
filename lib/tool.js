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

exports.getIp = position => {
  const interfaces = os.networkInterfaces();
  const ips = [];

  if (interfaces.en0) {
    for (let i = 0; i < interfaces.en0.length; i++) {
      if (interfaces.en0[i].family === 'IPv4') {
        ips.push(interfaces.en0[i].address);
      }
    }
  }
  if (interfaces.en1) {
    for (let i = 0; i < interfaces.en1.length; i++) {
      if (interfaces.en1[i].family === 'IPv4') {
        ips.push(interfaces.en1[i].address);
      }
    }
  }
  if (position > 0 && position <= ips.length) {
    return ips[position - 1];
  } else if (ips.length) {
    return ips[0];
  }
  return '127.0.0.1';
};

exports.getHost = port => {
  const ip = exports.getIp();
  return `http://${ip}:${port || 9000}`;
};