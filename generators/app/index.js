const fs = require('fs-promise');
const path = require('path');
const asyncUtils = require('async');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Generator = require('yeoman-generator');


module.exports = class extends Generator {

  prompting() {
    return async(_ => {
      this.answers = await(this.prompt([{
        type: 'input',
        name: 'title',
        message: 'Event title',
        default: this.appname
      }, {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname.replace(/ /g, '-')
      }, {
        type: 'input',
        name: 'description',
        message: 'Project description'
      }, {
        type: 'input',
        name: 'author',
        message: 'Project author',
        default: 'Google Developers Group (GDG) Cebu'
      }]));
    })();
  }


  writing() {
    return async(_ => {
      const templates = await(this._getTemplatePaths(this.sourceRoot()));
      const offset = this.sourceRoot().length + 1;
      const blacklist = ['static/fonts', 'static/images'];

      templates.forEach(template => {
        template = template.slice(offset);
        const destination = template.replace(/^_/, '.');

        if (blacklist.find(item => template.indexOf(item) === 0)) {
          this.fs.copy(
            this.templatePath(template),
            this.destinationPath(destination)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath(template),
            this.destinationPath(destination),
            this.answers
          );
        }
      });
    })();
  }


  install() {
    this.yarnInstall([
      'consolidate',
      'express',
      'fs-promise',
      'morgan',
      'nconf',
      'nodemon',
      'nunjucks',
      'serve-favicon',
      'winston',
      'sw-offline-google-analytics'
    ]);

    this.yarnInstall([
      'babel-core',
      'babel-preset-es2015',
      'gulp',
      'gulp-autoprefixer',
      'gulp-clean-css',
      'gulp-rename',
      'gulp-uglify'
    ], { dev: true });
  }


  _getTemplatePaths(base) {
    return async(_ => {
      const paths = [];
      const items = await(fs.readdir(base));
      asyncUtils.each(items, item => {
        const itemPath = path.join(base, item);
        const stat = await(fs.stat(itemPath));
        if (stat.isDirectory()) {
          paths.push.apply(paths, await(this._getTemplatePaths(itemPath)));
        } else {
          paths.push(itemPath);
        }
      });
      return paths;
    })();
  }

};
