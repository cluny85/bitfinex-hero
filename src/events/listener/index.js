const { filterSubscribed } = require('../filter');
const { emit } = require('../dispatcher');

const { log, error } = console;
const subscriptionsListeners = {};

const objectEvent = {
  auth        : log, // handleAuthEvent,
  subscribed  : subscribe, // handleSubscribedEvent,
  unsubscribed: unsubscribe, // handleUnsubscribedEvent,
  info        : log, // handleInfoEvent,
  conf        : log, // handleConfigEvent,
  error       : log, // handleErrorEvent
};

module.exports = {
  handleSubscribedEvents,
  handleObjectEvents
};

function handleSubscribedEvents(message) {
  const [chanId] = message;
  try {
    const eventType = subscriptionsListeners[chanId];
    log('subscriptionsListeners: ', eventType);
    emitSubscribedEvent(eventType, message);
  } catch (err) {
    error('ERROR on handleSubscribedEvents: ', err);
  }
}

function handleObjectEvents(message) {
  // TODO: aqui meter el filtro
  try {
    objectEvent[message.event](message);
  } catch (err) {
    error('ERROR in handleObjectEvents: message event not listed yet: ', message.event);
  }
}

function subscribe(message) {
  try {
    subscriptionsListeners[message.chanId] = {
      channel: message.channel,
      symbol : message.symbol
    };
  } catch (err) {
    error('subscribe', err);
  }
}

function unsubscribe(message) {
  try {
    delete subscriptionsListeners[message.chanId];
  } catch (err) {
    error('unsubscribe', err);
  }
}

function emitSubscribedEvent(type, message) {
  try {
    const messageReady = filterSubscribed(type, message);
    emit(messageReady);
  } catch (err) {
    error('ERROR on emitSubscribedEvent: ', err);
  }
}
