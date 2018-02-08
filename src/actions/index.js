const actionsNames = ['order'];

module.exports = {
  init
};

function init(dispatcher) {
  const actions = {};
  actionsNames.forEach((item) => { actions[item] = require(`./${item}`)(dispatcher); });
  return actions;
}
