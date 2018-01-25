const subscribedTypes = {};
['book', 'trades', 'ticker', 'candles', 'auth']
  .forEach((item) => { subscribedTypes[item] = require('./' + item) });

module.exports = subscribedTypes;
