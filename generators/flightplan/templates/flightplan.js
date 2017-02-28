const flightplan = require('flightplan');
const config = require('./config');


flightplan.target('production', {
  host: config.get('PRODUCTION_HOST'),
  username: config.get('PRODUCTION_USERNAME'),
  privateKey: config.get('PRODUCTION_PRIVATE_KEYFILE')
});


flightplan.remote('deploy', function(remote) {
  remote.log('Navigating to project directory');
  remote.with(`cd ${config.get('PRODUCTION_PROJECT_PATH')}`, _ => {

    remote.log('Pulling new changes');
    remote.exec('git pull origin master', { silent: true });

    remote.log('Building project');
    remote.exec('gulp build', { silent: true });

    remote.log('Restarting pm2 process');
    remote.exec(`pm2 restart ${config.get('PRODUCTION_PROCESS_NAME')}`, { silent: true });
  });
});
