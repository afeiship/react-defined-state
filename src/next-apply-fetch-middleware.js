(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var nxCompose = nx.compose || require('@feizheng/next-compose');

  nx.applyFetchMiddleware = function (inMiddlewares) {
    return function (inFetch) {
      return function (url, options) {
        var composeFetch = nxCompose.apply(null, inMiddlewares)(inFetch);
        return composeFetch(url, options);
      };
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.applyFetchMiddleware;
  }
})();
