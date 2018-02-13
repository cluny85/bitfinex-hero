const { Ticker } = require('../../../models');
const { TICKER } = require('../../../events');

module.exports = formatTicker;

function formatTicker(eventType, message) {
  const payload = Ticker.unserialize(message);
  const result = {
    type  : TICKER.UPDATE,
    symbol: eventType.symbol.split('t')[1],
    payload
  };
  return result;
}
