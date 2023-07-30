import createProxy from '@jswork/create-proxy';
import { useState } from 'react';

declare var wx: any;

export interface ReactDefinedStateOptions {
  state?: any;
  getters?: Record<string, Function>;
  actions?: Record<string, Function>;
}

const definedState = (initialState: ReactDefinedStateOptions) => {
  const [state, setState] = useState(initialState.state);

  // getters
  const getters = {};
  if (initialState.getters) {
    for (const [getterName, getterFunction] of Object.entries(initialState.getters)) {
      Object.defineProperty(getters, getterName, {
        get: () => getterFunction(state),
      });
    }
  }

  // Define actions
  const actions = initialState.actions || {};

  // Deep proxy to handle nested objects
  const deepProxyState = createProxy(state, (target, key, value) => {
    setState((prevState) => {
      const updatedState = { ...prevState };
      let parent = updatedState;
      const keys = key.split('.');
      for (let i = 0; i < keys.length - 1; i++) {
        if (!parent[keys[i]]) parent[keys[i]] = {};
        parent = parent[keys[i]];
      }
      parent[keys[keys.length - 1]] = value;
      return updatedState;
    });
  });

  return {
    state: deepProxyState,
    getters,
    actions,
  };
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = definedState;
}

export default definedState;
