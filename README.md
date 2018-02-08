# Bitfinex-hero

A realtime event based library for bitfinex API v2.

Work in progress...

🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

## Get Started

### Install
**not published on npm yet**
```
npm install --save bitfinex-hero
```

## Usage

### Configuration
First thing you need is to pass your Bitfinex API key to create a bitfinex-hero instance. The format of this config looks like:

```json
bitfinex: {
  apiKey   : '',
  apiSecret: ''
}
```

**IMPORTANT:** Some functionalities could not work if you don't allow all the permissions when you generate the API key.

### Init
To use this lib, you need to import:

```javascript
const config   = require('../config');
const bitfinex = require('bitfinex-hero');

...

try {
  const bfx = await bitfinex(config);
  const { subscribe, unsubscribe, actions, events } = bfx;
} catch (error) {
}
```

**subscribe, unsubscribe:** To start receiving events, just pass a single callback to the method subscribe:

```javascript
const callback = event => console.log(event);
subscribe(callback);
// to remove the callback listener:
unsubscribe(callback);
```

**actions:** Check the _src/actions_ folder to keep tracking of the actions available. Ie:
```javascript
const order = {
  type  : 'LIMIT',
  symbol: 'tBTCUSD',
  amount: 1,
  price : 1
};
actions.order.buy(order);
actions.order.cancel(orderId);
```

## Examples

Right now you can check the _bitfinex.e2e.test.js_ to get an idea of how to use it.

## Models

TODO:

Book -> algorithm
and much more...

## Support for coffee

- Ethereum wallet:

0xa653163B1D1Da5Ff8606e0b57beDC6C88fa83730

- Monero wallet:

4GdoN7NCTi8a5gZug7PrwZNKjvHFmKeV11L6pNJPgj5QNEHsN6eeX3DaAQFwZ1ufD4LYCZKArktt113W7QjWvQ7CW9tZ4FFgowFHYgv7tm
