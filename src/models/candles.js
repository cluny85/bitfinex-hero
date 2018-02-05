// https://bitfinex.readme.io/v2/reference#ws-public-candle
const validFields = ['mts', 'open', 'close', 'high', 'low', 'volume'];

const serialize = (data) => {
  const keys = Object.keys(data);
  const result = [];
  keys.forEach((item) => {
    if (validFields[item]) result.push(item);
    else console.log('CHECKOUT candles model serialize. Could been changed the specification.');
  });
  return result;
};

const unserialize = (data) => {
  const arr = data[1];
  return {
    mts   : arr[0],
    open  : arr[1],
    close : arr[2],
    high  : arr[3],
    low   : arr[4],
    volume: arr[5]
  };
};

module.exports = {
  serialize,
  unserialize
};

/*
# Key description:

MTS	    int	millisecond time stamp
OPEN  	float	First execution during the time frame
CLOSE	  float	Last execution during the time frame
HIGH	  float	Highest execution during the time frame
LOW	    float	Lowest execution during the timeframe
VOLUME	float	Quantity of symbol traded within the timeframe
*/
