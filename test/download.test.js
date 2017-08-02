'use strict';
const path = require('path');
const fs = require('fs');
const rimraf = require('mz-modules/rimraf');
const mkdirp = require('mz-modules/mkdirp');
const expect = require('chai').expect;
const Download = require('../lib/download');
// require('co-mocha');
// http://chaijs.com/api/bdd/

describe('base.test.js', () => {
  let download;
  before(() => {
    download = new Download();
  });

  after(() => {
  });

  beforeEach(() => {
  });

  afterEach(() => {
  });

  describe('#npm download build script test', () => {

    const vueBuildScript = 'easywebpack-vue-build-script';

    it('should getPackageInfo', function * () {
      const pkgInfo = yield download.getPackageInfo(vueBuildScript);
      expect(pkgInfo.dist.tarball).include(vueBuildScript);
    });

    it('should download build and copy', function * () {
      const downloadDir = yield download.download(vueBuildScript);
      const sourceDir = path.join(downloadDir, 'build');
      const targetDir = path.join(process.cwd(), `dist/${vueBuildScript}`);
      yield rimraf(targetDir);
      yield mkdirp(targetDir);
      download.copy(sourceDir, targetDir, { dir: true});
      expect(fs.existsSync(path.join(targetDir, 'index.js')));
    });
  });

  describe('#npm download vue boilerplate test', () => {

    const vueBoilerplate = 'egg-vue-webpack-boilerplate';
    it('should getPackageInfo', function * () {
      const pkgInfo = yield download.getPackageInfo(vueBoilerplate);
      console.log('pkgInfo.dist.tarball',pkgInfo.dist.tarball);
      expect(pkgInfo.dist.tarball).include(vueBoilerplate);
    });

    it('should download and copy', function * () {
      const downloadDir = yield download.download(vueBoilerplate);
      const sourceDir = downloadDir;
      const targetDir = path.join(process.cwd(), `dist/${vueBoilerplate}`);
      yield rimraf(targetDir);
      yield mkdirp(targetDir);
      download.copy(sourceDir, targetDir);
      download.updatePackageFile(targetDir);
      expect(fs.existsSync(path.join(targetDir, 'index.js')));
    });
  });
});
