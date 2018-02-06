const validFields = ['id', 'gid', 'cid', 'symbol', 'mtsCreate', 'mtsUpdate',
  'amount', 'amountOrig', 'type', 'typePrev', null, null, 'flags', 'status', null,
  null, 'price', 'priceAvg', 'priceTrailing', 'priceAuxLimit', null, null, null, 'notify',
  'hidden', 'placedId'];

/**
 * @return {Array} o
 */
const serialize = message =>
  [
    message.id,
    message.gid,
    message.cid,
    message.symbol,
    message.mtsCreate,
    message.mtsUpdate,
    message.amount,
    message.amountOrig,
    message.type,
    message.typePrev,
    null,
    null,
    message.flags,
    message.status,
    null,
    null,
    message.price,
    message.priceAvg,
    message.priceTrailing,
    message.priceAuxLimit,
    null,
    null,
    null,
    message.notify ? 1 : 0,
    message.hidden ? 1 : 0,
    message.placedId
  ];

const isSnapshot = data => Array.isArray(data);

const unserialize = (data) => {
  const arr = data[2];
  if (isSnapshot(arr[0])) {
    const result = [];
    arr.forEach((item) => {
      result.push(unserialize(item));
    });
    return result;
  }

  const result = {};
  for (let i = 0; i < data.length; i++) {
    if (validFields[i] !== null && validFields[i]) {
      result[validFields[i]] = (i === 23 || i === 24)
        ? data[i] === 1
        : data[i];
    }
  }
  return result;
};

module.exports = {
  serialize,
  unserialize
};
