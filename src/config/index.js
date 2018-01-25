const path = require('path');
// also exist a config validator module: joi, maybe could be useful
const validEnvironments = ['local', 'production'];
const environment = process.env.NODE_ENV && validEnvironments.indexOf(process.env.NODE_ENV) > 0 ?
                    process.env.NODE_ENV :
                    'local';

module.exports = {
  // Root path of server
  root: path.normalize(__dirname + '/..'),
  // environment configuration
  ...require('./' + environment + '.js')
}
