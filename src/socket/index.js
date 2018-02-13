const WebSocket = require('ws');
// const events = require('./eventActions');
const getAuth       = require('../auth');
const eventListener = require('./listener');
const { authEvent, subscribe, unsubscribe } = require('./dispatcher');
const subscribers   = require('./subscribers');
const defaultConfig = require('../config');

const { log, error } = console;
const publicSubscribers = ['Ticker', 'Trades', 'Candles']; // , 'Book'];

module.exports = () => {
  let ws;
  let config;
  let isOpen = false;
  let isAuthenticated = false;

  return {
    init,
    open,
    close,
    isOpen,
    send,
    subscribe,
    unsubscribe,
    subscribeAllFor,
    subscribeTicker,
    subscribeTrades,
    subscribeCandles,
    subscribeBook
    // setEvents,
    // addListener,
    // removeListener,
    // removeAllListeners
  };

  /**
   * 
   * @param {} config The config json must have a param 'port' to specify where to listen
   * @param {} events Json object 
   * https://socket.io/docs/server-api/
   */
  async function init(bitfinexConfig) {
    if (!config && !bitfinexConfig) throw new Error('[SOCKET IO] Failed to initializate the socket: there is no configuration or server.');
    if (bitfinexConfig) config = bitfinexConfig;
    config = Object.assign(config, defaultConfig);
    ws = new WebSocket(config.ws.url);
    log('INIT DONE');
    const ok = await open();
    return ws;
  }

  /**
   * Opens a connection to the API server. Rejects with an error if a
   * connection is already open. Resolves on success
   *
   * @return {Promise} p
   */
  async function open(withAuth = true) {
    if (isOpen) {
      throw new Error('already open');
    }
    log('OPENING...');

    ws.on('message', onMessage);
    // ws.on('open', onWSOpen);
    // ws.on('error', onWSError);
    // ws.on('close', onWSClose);

    return new Promise((resolve, reject) => {
      ws.once('open', () => {
        // TODO: launch error if auth fail
        if (withAuth) auth().catch(err => log('Auth failed: ', err));
        log('OPENED OK');
        isOpen = true;
        // subscribeTicker('tIOTUSD');
        // subscribeTrades('tIOTUSD');
        // subscribeCandles('tIOTUSD');
        resolve();
      });
    });
  }

  /**
   * Send a packet to the WS server
   *
   * @param {*} msg - packet, gets stringified
   */
  function send(msg) {
    if (!ws) throw new Error('ws not open');

    log('sending ', msg);
    ws.send(JSON.stringify(msg));
  }

  /**
   * Generates & sends an authentication packet to the server; if already
   * authenticated, rejects with an error. Resolves on success
   *
   * @param {number} calc - optional, default is 0
   * @return {Promise} p
   */
  async function auth(calc = 0) {
    if (isAuthenticated) throw new Error('already authenticated');
    const { sig, authPayload, authNonce } = getAuth(config.apiSecret);

    return new Promise((resolve, reject) => {
      ws.once('auth', () => resolve());

      send({
        event  : 'auth',
        apiKey : config.apiKey,
        authSig: sig,
        authPayload,
        authNonce,
        calc
      });
    });
  }

  /**
   * Closes the active connection. If there is none, rejects with a promise.
   * Resolves on success
   *
   * @param {number} code - passed to ws
   * @param {string} reason - passed to ws
   * @return {Promise}
   */
  async function close(code, reason) {
    if (!isOpen || ws === null) {
      throw new Error('not open');
    }

    // isClosing = true;
    return new Promise((resolve, reject) => {
      ws.once('close', () => {
        isOpen = false;
        resolve();
      });
      ws.close(code, reason);
    });
  }

  /**
   * Utility method to close & re-open the ws connection. Re-authenticates if
   * previously authenticated
   *
   * @return {Promise} p - resolves on completion
   */
  function reconnect() {
    if (!ws) return init();

    return new Promise((resolve, reject) => {
      ws.once('close', () => {
        init();
        open();

        // if (!wasEverAuthenticated) {
        //   return resolve();
        // }

        ws.once('open', auth);
        ws.once('auth', () => resolve());
      });

      close();
    });
  }

  function onMessage(message) {
    const msg = JSON.parse(message);
    log('onMessage ' + msg.length + ' ' + typeof msg + ' ', msg);

    if (Array.isArray(msg)) {
      if (typeof msg === 'object' && msg.length > 1) {
        if (msg[0] > 0 && typeof msg[1] !== 'string') {
          eventListener.handleSubscribedEvents(msg);
        } else {
          // TODO: hacer algo con los tipos de eventos que traen en la segunda posicion un string tipo: ow
          authEvent(msg);
        }
      }
      // ws: 'WALLET/SNAPSHOT',
      // os: 'ORDER/SNAPSHOT'
    } else if (msg.event) {
      eventListener.handleObjectEvents(msg);
    } else {
      log('onMessage unidentified message: ', msg);
    }
  }

  function subscribeAllFor(currency) {
    publicSubscribers.forEach((item) => {
      const message = subscribers[item](currency);
      send(message);
    });
  }

  function subscribeTicker(currency) {
    const message = subscribers.Ticker(currency);
    send(message);
  }

  function subscribeTrades(currency) {
    const message = subscribers.Trades(currency);
    send(message);
  }

  function subscribeCandles(currency, time) {
    const message = subscribers.Candles(currency, time);
    send(message);
  }

  function subscribeBook(currency) {
    // TODO
    // https://bitfinex.readme.io/v2/reference#ws-public-order-books
    // const message = subscribers.Book(currency);
    // send(message);
  }

  /**
   * Configures the seq flag to enable sequencing (packet number) for this
   * connection. When enabled, the seq number will be the last value of
   * channel packet arrays.
   *
   * @param {Object} args
   * @param {boolean} args.audit - if true, an error is emitted on invalid seq
   */
  // function enableSequencing(args = { audit: true }) {
  //   seqAudit = args.audit === true

  //   send({
  //     event: 'conf',
  //     flags: 65536
  //   });
  // }
};
