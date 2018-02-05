const { Candles } = require('../../../models');
const { CANDLES } = require('../../../events');

module.exports = formatCandles;

function formatCandles(eventType, message) {
  const payload = Candles.unserialize(message);
  const result = {
    type  : CANDLES.UPDATE,
    symbol: eventType.symbol,
    payload
  };
  return result;
}
