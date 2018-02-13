/* eslint no-shadow: ["error", { "allow": ["fcm"] }] */
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;
const config = require('../config');
const bitfinex = require('./index');

let bfx = {};
let lastOrderId = 0;

describe('Bitfinex-hero integration test', () => {
  before('must init bitfinex-hero', async () => {
    // addEventListener(stub)
    try {
      bfx = await bitfinex(config);
      return;
    } catch (error) {
      expect(error).not.to.exist();
    }
  });

  it('must exist all bitfinex-hero functions', () => {
    expect(bfx).to.have.all.keys('subscribe', 'unsubscribe', 'actions', 'events');
  });

  it('must create a new buy order', (done) => {
    const { subscribe, unsubscribe, actions, events } = bfx;
    const watchBuyOrder = (event) => {
      if (event.type === events.ORDERS.NEW) {
        expect(event).to.have.property('payload');
        expect(event.payload).to.have.property('id');
        lastOrderId = event.payload.id;
        unsubscribe(watchBuyOrder);
        done();
      }
    };

    subscribe(watchBuyOrder);

    const order = {
      type  : 'LIMIT',
      symbol: 'BTCUSD',
      amount: 1,
      price : 1
    };
    actions.order.buy(order);
  }).timeout(8000);

  it('must cancel current order', (done) => {
    console.log('lastOrderId-->', lastOrderId);
    const { subscribe, unsubscribe, actions, events } = bfx;
    expect(lastOrderId).to.be.gt(0);
    const watchCancelOrder = (event) => {
      if (event.type === events.ORDERS.CANCEL) {
        expect(event).to.have.property('payload');
        expect(event.payload).to.have.property('status');
        expect(event.payload.status).to.be.equal('CANCELED');
        unsubscribe(watchCancelOrder);
        done();
      }
    };

    subscribe(watchCancelOrder);
    // actionObjects.order.cancel(1518064774395, '2018-01-08');
    actions.order.cancel(lastOrderId);
  }).timeout(8000);
  // });
});
