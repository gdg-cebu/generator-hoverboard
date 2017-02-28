const Generator = require('yeoman-generator');


module.exports = class extends Generator {

  writing() {
    this.fs.copy(
      this.templatePath('flightplan.js'),
      this.destinationPath('flightplan.js')
    );

    const config = this.fs.extendJSON(
      this.destinationPath('config/secrets.json'),
      {
        "PRODUCTION_HOST": "",
        "PRODUCTION_USERNAME": "",
        "PRODUCTION_PRIVATE_KEYFILE": "",
        "PRODUCTION_PROJECT_PATH": "",
        "PRODUCTION_PROCESS_NAME": ""
      }
    );
  }


  install() {
    this.yarnInstall([
      'flightplan'
    ], { dev: true });
  }

};
