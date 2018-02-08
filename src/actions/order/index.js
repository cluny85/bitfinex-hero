const types = ['LIMIT', 'MARKET', 'STOP', 'TRAILING STOP', 'EXCHANGE MARKET',
  'EXCHANGE LIMIT', 'EXCHANGE STOP', 'EXCHANGE TRAILING STOP', 'FOK', 'EXCHANGE FOK'];

const errors = {
  notGoodParams: 'Order does not cointain proper params.',
  cancelFail   : 'Cancel order fail because of incorrect input params.'
};

module.exports = (distpach) => {
  return {
    buy,
    sell,
    cancel,
    multiOrders
  };

  function buy(order) {
    const payload = newOrder(order);
    const message = [0, 'on', null, payload];
    distpach(message);
  }

  function sell(order) {
    const payload = newOrder(order, true);
    const message = [0, 'on', null, payload];
    distpach(message);
  }

  /**
   * Cancel function could work passing the **Order id** or the **cid and cid_date**
   * @param {*} id number
   * @param {*} cidDate string
   */
  function cancel(id, cidDate) {
    const order = (id && typeof id === 'number' && cidDate && typeof cidDate === 'string')
      ? { cid: id, cid_date: cidDate }
      // ? { cid: [id, cidDate] }
      : (id && typeof id === 'number')
        ? { id }
        : undefined;
    if (!order) throw new Error(errors.cancelFail);
    const message = [0, 'oc', null, order];
    distpach(message);
  }

  function multiOrders(orders) {
    /*
    [
      0,
      "ox_multi",
      null,
      [
        ["on", {...}],
        ["oc", {...}],
        ["oc_multi", {...}],
        ["oc", {...}],
        ...
      ]
    ]
    */
  }
};

function validateFormatOrder(order) {
  assertOrderParams(order);
}

function newOrder(order, isSell) {
  assertOrderParams(order);
  const cid = Date.now();
  const amount = isSell ? `${-order.amount}` : `${+order.amount}`;
  return Object.assign(order, { cid, price: `${order.price}`, amount });
}

function assertOrderParams(order) {
  const { symbol, price, amount, type } = order;
  if (!symbol  || symbol.length < 7
    || !price  || price <= 0
    || !amount || amount <= 0
    || !type   || types.indexOf(type) < 0)
    throw new Error(errors.notGoodParams);
}

// model order:

// [
//   0,
//   "on",
//   null,
//   {
//     "gid": 1,
//     "cid": 12345,
//     "type": "LIMIT",
//     "symbol": "tBTCUSD",
//     "amount": "1.0",
//     "price": "500",
//     "hidden": 0
//   }
// ]

// Order Status: ACTIVE, EXECUTED, PARTIALLY FILLED, CANCELED

// INVALID CANCEL REQUEST:
/*
onMessage 3 object  [ 0,
  'n',
  [ 1518062604070,
    'oc-req',
    null,
    null,
    [ null,
      null,
      1518062387292,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      0,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null ],
    null,
    'ERROR',
    'cid: invalid' ] ]
*/
