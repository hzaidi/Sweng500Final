"use strict";
var __moduleName = "testing";
var Injector = $traceurRuntime.assertObject(require('./injector')).Injector;
var $__1 = $traceurRuntime.assertObject(require('./annotations')),
    Inject = $__1.Inject,
    annotate = $__1.annotate,
    readAnnotations = $__1.readAnnotations;
var isFunction = $traceurRuntime.assertObject(require('./util')).isFunction;
var createProviderFromFnOrClass = $traceurRuntime.assertObject(require('./providers')).createProviderFromFnOrClass;
var currentSpec = null;
beforeEach(function() {
  currentSpec = this;
  currentSpec.$$providers = [];
});
afterEach(function() {
  currentSpec.$$providers = null;
  currentSpec.$$injector = null;
  currentSpec = null;
});
function isRunning() {
  return !!currentSpec;
}
function use(mock) {
  if (currentSpec && currentSpec.$$injector) {
    throw new Error('Cannot call use() after inject() has already been called.');
  }
  var providerWrapper = {provider: mock};
  var fn = function() {
    currentSpec.$$providers.push(providerWrapper);
  };
  fn.as = function(token) {
    if (currentSpec && currentSpec.$$injector) {
      throw new Error('Cannot call as() after inject() has already been called.');
    }
    providerWrapper.as = token;
    if (isRunning()) {
      return undefined;
    }
    return fn;
  };
  if (isRunning()) {
    fn();
  }
  return fn;
}
function inject() {
  for (var params = [],
      $__0 = 0; $__0 < arguments.length; $__0++)
    params[$__0] = arguments[$__0];
  var behavior = params.pop();
  annotate(behavior, new (Function.prototype.bind.apply(Inject, $traceurRuntime.spread([null], params)))());
  var run = function() {
    if (!currentSpec.$$injector) {
      var providers = new Map();
      var modules = [];
      var annotations;
      currentSpec.$$providers.forEach(function(providerWrapper) {
        if (!providerWrapper.as) {
          modules.push(providerWrapper.provider);
        } else {
          if (!isFunction(providerWrapper.provider)) {
            providers.set(providerWrapper.as, createProviderFromFnOrClass(function() {
              return providerWrapper.provider;
            }, {
              provide: {
                token: null,
                isPromise: false
              },
              params: []
            }));
          } else {
            annotations = readAnnotations(providerWrapper.provider);
            providers.set(providerWrapper.as, createProviderFromFnOrClass(providerWrapper.provider, annotations));
          }
        }
      });
      currentSpec.$$injector = new Injector(modules, null, providers);
    }
    currentSpec.$$injector.get(behavior);
  };
  return isRunning() ? run() : run;
}
;
module.exports = {
  get use() {
    return use;
  },
  get inject() {
    return inject;
  },
  __esModule: true
};
