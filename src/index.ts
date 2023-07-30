declare var wx: any;

const ReactDefinedState = (): void => {
  console.log('hello');
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = ReactDefinedState;
}

export default ReactDefinedState;
