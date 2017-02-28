const flightplan = require('flightplan');
const config = require('./config');


flightplan.target('production', {
  host: config.get('SECRETS')['PRODUCTION_HOST'],
  username: config.get('SECRETS')['PRODUCTION_USERNAME'],
  privateKey: config.get('SECRETS')['PRODUCTION_PRIVATE_KEYFILE']
});


flightplan.remote('deploy', function(remote) {
  remote.log('Navigating to project directory');
  remote.with(`cd ${config.get('SECRETS')['PRODUCTION_PROJECT_PATH']}`, _ => {

    remote.log('Pulling new changes');
    remote.exec('git pull origin master', { silent: true });

    remote.log('Building project');
    remote.exec('gulp build', { silent: true });

    remote.log('Restarting pm2 process');
    remote.exec(`pm2 restart ${config.get('SECRETS')['PRODUCTION_PROCESS_NAME']}`, { silent: true });
  });
});
