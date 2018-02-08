const { filterEvent } = require('../filter');

const callbacksSubscribed = [];
const errors = {
  remove: {
    noCallback: ''
  }
};

/**
 * Subscribe to receive custom events from bitfinex api
 * @param {function} cb function callback that pass event json object like argument
 */
const subscribeEventEmiter = cb => callbacksSubscribed.push(cb);
const emit                 = event => callbacksSubscribed.forEach(cb => cb(event));
// const authEvent            = message => emit(filterEvent(message));
const getSubscribedNumber  = () => callbacksSubscribed.length;

module.exports = {
  emit,
  subscribe  : subscribeEventEmiter,
  unsubscribe: unsubscribeEventEmiter,
  authEvent,
  getSubscribedNumber
};

function authEvent(message) {
  const toEmit = filterEvent(message);
  if (toEmit) emit(toEmit);
}

function unsubscribeEventEmiter(cb) {
  if (typeof cb !== 'function') throw new Error(errors.remove.noCallback);
  const index = callbacksSubscribed.indexOf(cb);
  if (index !== -1) callbacksSubscribed.splice(index, 1);
}
