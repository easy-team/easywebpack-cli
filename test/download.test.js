'use strict';
const path = require('path');
const fs = require('fs');
const rimraf = require('mz-modules/rimraf');
const mkdirp = require('mz-modules/mkdirp');
const expect = require('chai').expect;
const Download = require('../lib/download');

// require('co-mocha');
// http://chaijs.com/api/bdd/

describe('download.test.js', () => {
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

  describe('#npm download cli test', () => {
    const projectDir = path.join(process.cwd(), 'dist/cli');
    it('should init cli config test', function *() {
      download.init(projectDir, 'easywebpack-cli-template', {}, { type: 'cli', baseDir: 'cli', framework: 'cli', dir: false });
    });

    it('should init egg-react-webpack-boilerplate test', function *() {
      download.init(projectDir, 'egg-react-webpack-boilerplate', { }, { hide: true, update: true });
    });
  });

  describe('#npm download build script test', () => {

    const vueBuildScript = 'easywebpack-vue-build-script';

    it('should getPackageInfo', function *() {
      const pkgInfo = yield download.getPackageInfo(vueBuildScript);
      expect(pkgInfo.dist.tarball).include(vueBuildScript);
    });

    it('should download build and copy', function *() {
      const downloadDir = yield download.download(vueBuildScript);
      const sourceDir = downloadDir;
      const targetDir = path.join(process.cwd(), `dist/${vueBuildScript}`);
      yield rimraf(targetDir);
      yield mkdirp(targetDir);
      download.copy(sourceDir, targetDir, { dir: 'build' });
      expect(fs.existsSync(path.join(targetDir, 'build', 'index.js'))).to.be.true;
    });
  });

  describe('#npm download vue boilerplate test', () => {

    const vueBoilerplate = 'egg-vue-webpack-boilerplate';
    it('should getPackageInfo', function *() {
      const pkgInfo = yield download.getPackageInfo(vueBoilerplate);
      console.log('pkgInfo.dist.tarball', pkgInfo.dist.tarball);
      expect(pkgInfo.dist.tarball).include(vueBoilerplate);
    });

    it('should download and copy', function *() {
      const downloadDir = yield download.download(vueBoilerplate);
      const sourceDir = downloadDir;
      const targetDir = path.join(process.cwd(), `dist/${vueBoilerplate}`);
      yield rimraf(targetDir);
      yield mkdirp(targetDir);
      download.copy(sourceDir, targetDir, { hide: true });
      download.updatePackageFile(targetDir);
      expect(fs.existsSync(path.join(targetDir, 'app/router.js'))).to.be.true;
      expect(fs.existsSync(path.join(targetDir, '.babelrc'))).to.be.true;
    });
  });
});
