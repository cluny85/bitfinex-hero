const { Trades } = require('../../../models');
const { TRADES } = require('../../../events');

module.exports = formatTrades;

function formatTrades(eventType, message) {
  const payload = Trades.unserialize(message);
  const result = {
    type  : TRADES.SNAPSHOT,
    symbol: eventType.symbol.split('t')[1],
    payload
  };
  return result;
}
