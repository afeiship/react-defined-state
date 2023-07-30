import { useState, useMemo } from 'react';

declare var wx: any;

function observer(initialVal, cb) {
  return new Proxy(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return typeof res === 'object' ? observer(res, cb) : res;
    },
    set(target, key, val) {
      cb();
      return Reflect.set(target, key, val);
    },
  });
}

function useProxyState<S extends object>(initialState: S): S {
  const [observerState, setObserverState] = useState<S>(initialState);

  let state = useMemo(() => {
    return observer(observerState, () => {
      setObserverState({ ...observerState });
    });
  }, []);

  return state;
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = useProxyState;
}

export default useProxyState;
