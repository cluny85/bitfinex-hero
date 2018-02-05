// NOT AN AUTH EVENT -> POOR BITFINEX DESIGN
const { Trades } = require('../../../../models');
const { TRADES } = require('../../../index');

const { log, error } = console;

module.exports = {
  te: log,
  tu: onTrade
};

function onTrade(type, message) {
  try {
    const eventType = TRADES.UPDATE;
    const trade = Trades.unserialize(message);
    log('unserialized Trade: ', trade);
    return constructEventMessage(eventType, trade);
  } catch (err) {
    error('ERROR -- onTrade -- ', err);
    return {};
  }
}

function constructEventMessage(type, payload) {
  return {
    type,
    payload
  };
}
