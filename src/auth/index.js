const crypto = require('crypto');

const genAuthSig = (secret) => {
  const authNonce = Date.now() * 1000;
  const authPayload   = `AUTH${authNonce}${authNonce}`;

  const sig = crypto
    .createHmac('sha384', secret)
    .update(authPayload)
    .digest('hex');

  return {
    authPayload,
    sig,
    authNonce
  };
};

module.exports = genAuthSig;
