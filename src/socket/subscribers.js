const timeFrames = ['1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '7D', '14D', '1M'];
const adaptCurrency = currency => `t${currency}`;

const Ticker = currency => ({
  event  : 'subscribe',
  channel: 'ticker',
  symbol : adaptCurrency(currency)
});

const Trades = currency => ({
  event  : 'subscribe',
  channel: 'trades',
  symbol : adaptCurrency(currency)
});

const Candles = (currency, time = '1m') => {
  const keyTime = timeFrames.indexOf(time) >= 0 ? time : '1m';
  return {
    event  : 'subscribe',
    channel: 'candles',
    key    : `trade:${keyTime}:${adaptCurrency(currency)}`
  };
};

// https://bitfinex.readme.io/v2/reference#ws-public-order-books
const Book = currency => ({
  event  : 'subscribe',
  channel: 'book',
  symbol : adaptCurrency(currency)
  // prec   : PRECISION,
  // freq   : FREQUENCY,
  // len    : LENGTH Number of price points ("25", "100") [default="25"]
});

module.exports = {
  Ticker,
  Trades,
  Candles,
  Book
};
