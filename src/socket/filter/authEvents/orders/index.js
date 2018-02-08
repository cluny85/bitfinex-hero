const { Orders } = require('../../../../models');
const { ORDERS } = require('../../../../events');

const { log, error } = console;

module.exports = {
  on: onOrder.bind(this, ORDERS.NEW),
  ou: onOrder.bind(this, ORDERS.UPDATE),
  oc: onOrder.bind(this, ORDERS.CANCEL),
  os: onOrder.bind(this, ORDERS.SNAPSHOT)
};

function onOrder(eventType, type, message) {
  try {
    const orders = Orders.unserialize(message);
    log(`unserialize Orders ${eventType}: `, orders);
    return constructEventMessage(eventType, orders);
  } catch (err) {
    error(`ERROR -- onOrder ${eventType} -- `, err);
    return {};
  }
}

function constructEventMessage(type, payload) {
  return {
    type,
    payload
  };
}
