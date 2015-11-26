export default class ReduxResolver {
  constructor() {
    this.pending = [];
    this.initialRender = true;
  }

  resolve(...actions) {
    const [action, ...args] = actions;

    if (__CLIENT__ && !this.initialRender) {
      return action(...args);
    }

    this.pending = [...this.pending, {action, args}];
  }

  async dispatchAll() {
    await Promise.all(this.pending.map(({action, args}) => action(...args)));
  }

  clear() {
    this.pending = [];
    this.initialRender = false;
  }
}
