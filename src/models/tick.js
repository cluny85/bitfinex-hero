const serialize = (data) =>
  (!data.symbol)
  ? []
  : (data.symbol[0] === 't')
    ? [
      data.symbol,
      data.bid,
      data.bidSize,
      data.ask,
      data.askSize,
      data.dailyChange,
      data.dailyChangePerc,
      data.lastPrice,
      data.volume,
      data.high,
      data.low
    ]
    : [
      data.symbol,
      data.frr,
      data.bid,
      data.bidSize,
      data.bidPeriod,
      data.ask,
      data.askSize,
      data.askPeriod,
      data.dailyChange,
      data.dailyChangePerc,
      data.lastPrice,
      data.volume,
      data.high,
      data.low
    ];

const unserialize = (data) =>
  (Array.isArray(data[0]))
  ? data.map(tick => unserialize(tick))
  : (!data[0])
    ? null
    : (data[0][0] === 't')
      ? {
        symbol: data[0],
        bid: data[1],
        bidSize: data[2],
        ask: data[3],
        askSize: data[4],
        dailyChange: data[5],
        dailyChangePerc: data[6],
        lastPrice: data[7],
        volume: data[8],
        high: data[9],
        low: data[10]
      }
      : {
        symbol: data[0],
        frr: data[1],
        bid: data[2],
        bidSize: data[3],
        bidPeriod: data[4],
        ask: data[5],
        askSize: data[6],
        askPeriod: data[7],
        dailyChange: data[8],
        dailyChangePerc: data[9],
        lastPrice: data[10],
        volume: data[11],
        high: data[12],
        low: data[13]
      };

module.exports = {
  serialize,
  unserialize
};
