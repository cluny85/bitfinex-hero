const validFields = ['frr', 'bid', 'bidSize', 'bidPeriod', 'ask', 'askSize', 'askPeriod', 'dailyChange', 
  'dailyChangePerc', 'lastPrice', 'volume', 'high', 'low'];

const serialize = (data) => {
  const keys = Object.keys(data);
  const result = [];
  keys.forEach((item) => {
    if (validFields[item]) result.push(item);
  });
  return result;
};

const unserialize = (data) => {
  const arr = data[1];
  return arr.length === 10
    ? {
      bid            : arr[0],
      bidSize        : arr[1],
      ask            : arr[2],
      askSize        : arr[3],
      dailyChange    : arr[4],
      dailyChangePerc: arr[5],
      lastPrice      : arr[6],
      volume         : arr[7],
      high           : arr[8],
      low            : arr[9]
    }
    : {
      frr            : arr[0],
      bid            : arr[1],
      bidPeriod      : arr[2],
      bidSize        : arr[3],
      ask            : arr[4],
      askPeriod      : arr[5],
      askSize        : arr[6],
      dailyChange    : arr[7],
      dailyChangePerc: arr[8],
      lastPrice      : arr[9],
      volume         : arr[10],
      high           : arr[11],
      low            : arr[12]
    };
};

module.exports = {
  serialize,
  unserialize
};

/*
# Key description:

FRR	float	Flash Return Rate - average of all fixed rate funding over the last hour
BID	float	Price of last highest bid
BID_PERIOD	integer	Bid period covered in days
BID_SIZE	float	Size of the last highest bid
ASK	float	Price of last lowest ask
ASK_PERIOD	integer	Ask period covered in days
ASK_SIZE	float	Size of the last lowest ask
DAILY_CHANGE	float	Amount that the last price has changed since yesterday
DAILY_CHANGE_PERC	float	Amount that the price has changed expressed in percentage terms
LAST_PRICE	float	Price of the last trade.
VOLUME	float	Daily volume
HIGH	float	Daily high
LOW	float	Daily low
*/