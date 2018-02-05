// https://bitfinex.readme.io/v2/reference#ws-public-trades
const validFields = ['id', 'mts', 'amount', 'price', 'rate', 'period'];

const isSnapshot = data => Array.isArray(data);
const isTrading  = data => data.length === 4;
const isFunding  = data => data.length === 5;

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
  if (isSnapshot(arr)) {
    const result = [];
    arr.forEach((item) => {
      result.push(unserialize(item));
    });
    return result;
  }
  const item = (isSnapshot(data[2])) ? data[2] : data;
  return isTrading
    ? {
      id    : item[0],
      mts   : item[1],
      amount: item[2],
      price : item[3]
    }
    : isFunding
      ? {
        id    : item[0],
        mts   : item[1],
        amount: item[2],
        rate  : item[3],
        period: item[4]
      }
      : {};
};

module.exports = {
  serialize,
  unserialize
};
