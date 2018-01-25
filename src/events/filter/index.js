const subscribedTypes = require('./subscribed');
const authTypes       = require('./auth');

const { log, error } = console;

module.exports = {
  filterSubscribed,
  filterAuth
};

function filterAuth(message) {
  const type = message[1];
  log('============= ', type);
  try {
    return (authTypes[type])
      ? authTypes[type](type, message)
      : {};
  } catch (err) {
    throw new Error('Auth event not founded: ', type);
  }
}

function filterSubscribed(type, message) {
  try {
    log('>>>>>>>>>>>>>>>>> ', type);
    return (subscribedTypes[type.channel])
      ? subscribedTypes[type.channel](type, message)
      : {};
  } catch (err) {
    error('-- MEC -- ', err);
    throw new Error('Subscribed event not founded: ' + type.channel);
  }
}
