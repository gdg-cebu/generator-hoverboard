const path = require('path');
const nconf = require('nconf');


nconf
  .argv()
  .env()
  .file({ file: path.join(__dirname, 'config.json') })
  .defaults({
    PORT: 3000,
    SECRETS: nconf.loadFilesSync([path.join(__dirname, 'secrets.json')])
  });


module.exports = nconf;
