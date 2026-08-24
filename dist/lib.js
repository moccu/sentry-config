(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@sentry/browser')) :
  typeof define === 'function' && define.amd ? define(['exports', '@sentry/browser'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["sentry-config"] = {}, global.Sentry));
})(this, (function (exports, Sentry) { 'use strict';

  function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }

  var Sentry__namespace = /*#__PURE__*/_interopNamespaceDefault(Sentry);

  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o,
      r,
      i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
  }
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n)) continue;
      t[n] = r[n];
    }
    return t;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _objectSpread(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? Object(arguments[r]) : {},
        o = Object.keys(t);
      "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), o.forEach(function (r) {
        _defineProperty(e, r, t[r]);
      });
    }
    return e;
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
    ignoreErrors = [
    // Random plugins/extensions
    'top.GLOBALS',
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    'originalCreateNotification', 'canvas.contentDocument', 'MyApp_RemoveAllHighlights', 'http://tt.epicplay.com', 'Can\'t find variable: ZiteReader', 'jigsaw is not defined', 'ComboSearch is not defined', 'http://loading.retry.widdit.com/', 'atomicFindClose',
    // Facebook borked
    'fb_xd_fragment',
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
    'bmi_SafeAddOnload', 'EBCallBackMessageReceived',
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    'conduitPage',
    // Moccu defined
    /window\.performance/, /__firefox__/],
    /**
     * The inverse of whitelistUrls and similar to ignoreErrors, but will ignore
     * errors from whole URLs matching a regex pattern or an exact string.
     *
     * @type {Array}
     */
    ignoreUrls = [
    // Google Services
    /google-analytics\.com/, /googletagmanager\.com/, /googleadservices\.com/, /\/(gtm|ga|analytics)\.js/i,
    // Facebook
    /graph\.facebook\.com/i, /connect\.facebook\.net/i,
    // Chrome extensions
    /extensions\//i, /^chrome:\/\//i,
    // Firefox extensions
    /^resource:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i,
    // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i, /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
    //Moccu defined
    /youtube\.com/, /ytimg\.com/, /cloudflare\.com/, /cloudfront.net/, /grmtech\.net/, /qtracker/, /fast\.fonts\.net/, /twinesocial\.com/];
  function init(_ref) {
    var dsn = _ref.dsn,
      whitelistUrls = _ref.whitelistUrls,
      allowUrls = _ref.allowUrls,
      _ref$ignoreUrls = _ref.ignoreUrls,
      denyUrls = _ref$ignoreUrls === void 0 ? [] : _ref$ignoreUrls,
      _ref$tags = _ref.tags,
      tags = _ref$tags === void 0 ? {} : _ref$tags,
      settings = _objectWithoutProperties(_ref, ["dsn", "whitelistUrls", "allowUrls", "ignoreUrls", "tags"]);
    var expose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    // `whitelistUrls` is kept as a deprecated alias for `allowUrls` (removed
    // from the Sentry SDK in v7) so existing callers don't break on upgrade.
    allowUrls = whitelistUrls || allowUrls;

    // Log error if dsn or allow list is not defined.
    if (!dsn || !allowUrls) {
      globalThis.console && globalThis.console.error && globalThis.console.error('Setup sentry using dsn and allowUrls.');
      return false;
    }

    // Transform allow list urls strings (from json) into regular expressions.
    allowUrls = allowUrls.map(function (url) {
      return new RegExp(url);
    });
    Sentry__namespace.init(_objectSpread({
      dsn: dsn,
      allowUrls: allowUrls,
      denyUrls: denyUrls
    }, settings));

    // Add additional tags under 'tags' property from settings.
    var scope = Sentry__namespace.getCurrentScope();
    Object.keys(tags).forEach(function (key) {
      return scope.setTag(key, tags[key]);
    });

    // Expose Sentry API to global namespace.
    if (expose) {
      globalThis.Sentry = Sentry__namespace;
    }
    return true;
  }

  exports.ignoreErrors = ignoreErrors;
  exports.ignoreUrls = ignoreUrls;
  exports.init = init;

}));
