const { Wallet } = require('../../../../models');
const { WALLET } = require('../../../index');
// const authTypes = {
//   ws: onWalletSnapshot,
//   os: log
// };
const { log, error } = console;

module.exports = {
  ws: onWalletSnapshot,
  os: log
};

function onWalletSnapshot(type, message) {
  try {
    const wallet = extractCurrenciesWithBalance(message[2]);
    const eventType = WALLET.SNAPSHOT;
    log('unserialize WalletSnapshot: ', wallet);
    return constructEventMessage(eventType, wallet);
  } catch (err) {
    error('ERROR -- onWalletSnapshot -- ', err);
    return {};
  }
}

function extractCurrenciesWithBalance(message) {
  const wallet = [];
  message.forEach((data) => {
    const item = Wallet.unserialize(data);
    if (item && item.balance > 0) wallet.push(item);
  });
  return wallet;
}

function constructEventMessage(type, payload) {
  return {
    type,
    payload
  };
}
