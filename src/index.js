const config = require('./config');
const subscribe = require('./events/dispatcher').subscribeEventEmiter;

const { log, error } = console;
subscribe((event) => log('*** dispatching callback señoreessss: ', event));

try {
  const bfx = require('./socket')();
  const ws = bfx.init(config.bitfinex);
  // bfx.open();
} catch (err) {
  console.log('FUUUUUUUCK ', err);
}

module.exports = (conf) => {

  return {
    addEventListener: subscribe
  };
};
