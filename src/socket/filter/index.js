const subscribedTypes = require('./subscribed');
const eTypes          = require('./authEvents');

const { log, error } = console;

module.exports = {
  filterSubscribed,
  filterEvent
};

function filterEvent(message) {
  const type = message[1];
  log('============= ', type);
  try {
    return (eTypes[type])
      ? eTypes[type](type, message)
      : undefined;
  } catch (err) {
    throw new Error('Auth event not founded: ', type);
  }
}

function filterSubscribed(type, message) {
  try {
    log('>>>>>>>>>>>>>>>>> ', type);
    return (subscribedTypes[type.channel])
      ? subscribedTypes[type.channel](type, message)
      : undefined;
  } catch (err) {
    error('-- MEC -- ', err);
    throw new Error('Subscribed event not founded: ' + type.channel);
  }
}
