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

  // Define actions
  const actions = initialState.actions || {};

  if (initialState.actions) {
    for (const [actionName, actionFunction] of Object.entries(initialState.actions)) {
      // Check if the actionFunction is an arrow function
      if (actionFunction instanceof Function && !actionFunction.hasOwnProperty('prototype')) {
        // If it's an arrow function, just pass the state as the first parameter
        actions[actionName] = (...args) => actionFunction(state, ...args);
      } else {
        // If it's a non-arrow function, bind the state to 'this' and pass it as the first parameter
        actions[actionName] = actionFunction.bind(state);
      }
    }
  }

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

  // getters
  if (initialState.getters) {
    for (const [getterName, getterFunction] of Object.entries(initialState.getters)) {
      Object.defineProperty(state, getterName, {
        get: () => getterFunction(state),
      });
    }
  }

  return {
    state: deepProxyState,
    ...actions,
  };
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = definedState;
}

export default definedState;
