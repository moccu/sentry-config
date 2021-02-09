(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@sentry/browser')) :
  typeof define === 'function' && define.amd ? define(['exports', '@sentry/browser'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['sentry-config'] = {}, global.Sentry));
}(this, (function (exports, Sentry) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var Sentry__namespace = /*#__PURE__*/_interopNamespace(Sentry);

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var /**
   * Very often, you will come across specific errors that are a result of
   * something other than your application, or errors that you’re completely not
   * interested in. ignoreErrors is a list of these messages to be filtered out
   * before being sent to Sentry as either regular expressions or strings. When
   * using strings, they’ll partially match the messages, so if you need to
   * achieve an exact match, use RegExp patterns instead.
   *
   * @type {Array}
   */
  ignoreErrors = [// Random plugins/extensions
  'top.GLOBALS', // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
  'originalCreateNotification', 'canvas.contentDocument', 'MyApp_RemoveAllHighlights', 'http://tt.epicplay.com', 'Can\'t find variable: ZiteReader', 'jigsaw is not defined', 'ComboSearch is not defined', 'http://loading.retry.widdit.com/', 'atomicFindClose', // Facebook borked
  'fb_xd_fragment', // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
  // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
  'bmi_SafeAddOnload', 'EBCallBackMessageReceived', // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
  'conduitPage', // Moccu defined
  /window\.performance/, /__firefox__/],

  /**
   * The inverse of whitelistUrls and similar to ignoreErrors, but will ignore
   * errors from whole URLs matching a regex pattern or an exact string.
   *
   * @type {Array}
   */
  ignoreUrls = [// Google Services
  /google-analytics\.com/, /googletagmanager\.com/, /googleadservices\.com/, /\/(gtm|ga|analytics)\.js/i, // Facebook
  /graph\.facebook\.com/i, /connect\.facebook\.net/i, // Chrome extensions
  /extensions\//i, /^chrome:\/\//i, // Firefox extensions
  /^resource:\/\//i, // Other plugins
  /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
  /webappstoolbarba\.texthelp\.com\//i, /metrics\.itunes\.apple\.com\.edgesuite\.net\//i, //Moccu defined
  /youtube\.com/, /ytimg\.com/, /cloudflare\.com/, /cloudfront.net/, /grmtech\.net/, /qtracker/, /fast\.fonts\.net/, /twinesocial\.com/];

  function init(_ref) {
    var dsn = _ref.dsn,
        whitelistUrls = _ref.whitelistUrls,
        _ref$tags = _ref.tags,
        tags = _ref$tags === void 0 ? {} : _ref$tags,
        settings = _objectWithoutProperties(_ref, ["dsn", "whitelistUrls", "tags"]);

    var expose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    // Log error if dsn or whitelist is not defined.
    if (!dsn || !whitelistUrls) {
      global.console && global.console.error && global.console.error('Setup sentry using dsn and whitelistUrls.');
      return false;
    } // Transform whitelist urls strings (from json) into regular expressions.


    whitelistUrls = whitelistUrls.map(function (url) {
      return new RegExp(url);
    });
    Sentry.init(_objectSpread({
      dsn: dsn,
      whitelistUrls: whitelistUrls
    }, settings)); // Add additional tags under 'tags' property from settings.

    Sentry.configureScope(function (scope) {
      Object.keys(tags).forEach(function (key) {
        return scope.setTag(key, tags[key]);
      });
    }); // Expose Sentry API to global namespace.

    if (expose) {
      global.Sentry = Sentry__namespace;
    }

    return true;
  }

  exports.ignoreErrors = ignoreErrors;
  exports.ignoreUrls = ignoreUrls;
  exports.init = init;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
