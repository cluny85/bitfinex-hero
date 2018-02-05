const events = {};
['ticker', 'trades', 'book', 'candles', 'wallet']
  .forEach((item) => { Object.assign(events, require(`./${item}`)) });

module.exports = events;

/*
{
  // OrderBook    : require('./order_book'),
  // BalanceInfo  : require('./balance_info'),
  // FundingCredit: require('./funding_credit'),
  // FundingInfo  : require('./funding_info'),
  // FundingLoan  : require('./funding_loan'),
  // FundingOffer : require('./funding_offer'),
  // FundingTrade : require('./funding_trade'),
  // MarginInfo   : require('./margin_info'),
  // Notification : require('./notification'),
  // Order        : require('./order'),
  // Position     : require('./position'),
  // Trade        : require('./trade'),
  Wallet       : require('./wallet'),
  // Alert        : require('./alert'),
  Tick         : require('./tick'),
  Ticker       : require('./ticker'),
  // TradeTick    : require('./trade_tick'),
  // Candle       : require('./candle')
};
*/
