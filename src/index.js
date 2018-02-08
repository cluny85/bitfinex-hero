const bfxWS = require('./socket');
const bfxRest = require('./rest');

const events  = require('./events');
const actions = require('./actions');

const { log, error } = console;

module.exports = async (config) => {
  try {
    const ws = bfxWS();
    const ok = await ws.init(config.bitfinex);
    const { subscribe, unsubscribe } = ws;
    // DEBUG
    subscribe((event) => log('*** dispatching callback señoreessss: ', event));
    // -----
    const distpacher = ws.send;
    const actionObjects = actions.init(distpacher);

    return {
      subscribe,
      unsubscribe,
      actions: actionObjects,
      events
    };
  } catch (err) {
    error('FUUUUUUUCK ', err);
    throw new Error(err);
  }
};
