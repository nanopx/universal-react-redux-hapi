const logger = (store) => (next) => (action) => { // eslint-disable-line no-unused-vars
  // logging actions for both server and client
  console.info(`Dispatching action: ${action.type}`);  // eslint-disable-line no-console
  return next(action);
};

export default logger;
