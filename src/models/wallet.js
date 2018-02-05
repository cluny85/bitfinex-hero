const walletTypes = ['exchange', 'margin', 'funding'];
const types = {};

walletTypes.forEach((type) => {
  types[type.toUpperCase()] = type;
});

const serialize = data => [
  data.type,
  data.currency,
  data.balance,
  data.unsettledInterest,
  data.balanceAvailable
];

const unserialize = data => ({
  type             : data[0],
  currency         : data[1],
  balance          : data[2],
  unsettledInterest: data[3],
  balanceAvailable : data[4]
});

module.exports = {
  serialize,
  unserialize,
  types
};
