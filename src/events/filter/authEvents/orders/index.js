const { Orders } = require('../../../../models');
const { ORDERS } = require('../../../../events');
// const authTypes = {
//   ws: onWalletSnapshot,
//   os: log
// };
const { log, error } = console;

module.exports = {
  on: onOrderNew,
  ou: onOrderUpdate,
  oc: onOrderCancel,
  os: onOrdersSnapshot
};

function onOrdersSnapshot(type, message) {
  log('---', message);
  try {
    const orders = Orders.unserialize(message);
    const eventType = ORDERS.SNAPSHOT;
    log('unserialize OrdersSnapshot: ', orders);
    return constructEventMessage(eventType, orders);
  } catch (err) {
    error('ERROR -- onOrdersSnapshot -- ', err);
    return {};
  }
}

function onOrderNew() {
  return {};
}

function onOrderUpdate() {
  return {};
}

function onOrderCancel() {
  return {};
}

function constructEventMessage(type, payload) {
  return {
    type,
    payload
  };
}
