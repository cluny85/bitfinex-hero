// https://bitfinex.readme.io/v2/reference#ws-public-order-books
const validFields = ['price', 'rate', 'period', 'count', 'amount'];

const serialize = (data) => {
  const keys = Object.keys(data);
  const result = [];
  keys.forEach((item) => {
    if (validFields[item]) result.push(item);
    else console.log('CHECKOUT book model serialize. Could been changed the specification.');
  });
  return result;
};

const unserialize = (data) => {
  const arr = data[1];
  return arr.length === 3
    ? {
      price : arr[0],
      count : arr[1],
      amount: arr[2]
    }
    : {
      rate  : arr[0],
      period: arr[1],
      count : arr[2],
      amount: arr[3]
    };
};

module.exports = {
  serialize,
  unserialize
};

// TODO: algoritmo para mantener en memoria actualizado el book
// https://gist.github.com/prdn/b8c067c758aab7fa3bf715101086b47c

/*
# Key description:

PRICE	  float	Price level
RATE	  float	Rate level
PERIOD	float	Period level
COUNT	  int	Number of orders at that price level
±AMOUNT	float	Total amount available at that price level. 
        Trading: if AMOUNT > 0 then bid else ask; Funding: if AMOUNT < 0 then bid else ask;
*/
