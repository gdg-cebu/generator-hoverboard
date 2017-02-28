const Generator = require('yeoman-generator');


module.exports = class extends Generator {

  writing() {
    this.fs.copy(
      this.templatePath('flightplan.js'),
      this.destinationPath('flightplan.js')
    );
  }


  install() {
    this.yarnInstall([
      'flightplan'
    ], { dev: true });
  }

};
