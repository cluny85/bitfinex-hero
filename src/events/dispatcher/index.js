const { filterEvent } = require('../filter');

const callbacksSubscribed = [];

/**
 * Subscribe to receive custom events from bitfinex api
 * @param {function} cb function callback that pass event json object like argument
 */
const subscribeEventEmiter = cb => callbacksSubscribed.push(cb);
const emit                 = event => callbacksSubscribed.forEach(cb => cb(event));
const authEvent            = message => emit(filterEvent(message));
const getSubscribedNumber  = () => callbacksSubscribed.length;

module.exports = {
  subscribeEventEmiter,
  emit,
  authEvent,
  getSubscribedNumber
};
