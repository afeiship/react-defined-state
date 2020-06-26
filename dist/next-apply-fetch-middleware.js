/*!
 * name: @feizheng/next-apply-fetch-middleware
 * description: Fetch meet middlewares.
 * homepage: https://github.com/afeiship/next-apply-fetch-middleware
 * version: 1.0.0
 * date: 2020-06-26T06:17:07.939Z
 * license: MIT
 */

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

//# sourceMappingURL=next-apply-fetch-middleware.js.map
