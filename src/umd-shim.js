
  // src/umd-shim.js
  // UMD shim. This file is injected into the IIFE bundle, replacing its IIFE closing parenthesis line.
  ((root, factory) => {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory);
    } else if (typeof module === 'object' && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
    } else {
      // Browser globals (root is window)
      root.chromiumFormatter = factory();
    }
  })(typeof self !== 'undefined' ? self : this, () => format);
})();