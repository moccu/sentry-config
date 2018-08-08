/**
 * Very often, you will come across specific errors that are a result of
 * something other than your application, or errors that you’re completely not
 * interested in. ignoreErrors is a list of these messages to be filtered out
 * before being sent to Sentry as either regular expressions or strings. When
 * using strings, they’ll partially match the messages, so if you need to
 * achieve an exact match, use RegExp patterns instead.
 *
 * @type {Array}
 */
const ignoreErrors = [
	// Random plugins/extensions
	'top.GLOBALS',

	// See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
	'originalCreateNotification',
	'canvas.contentDocument',
	'MyApp_RemoveAllHighlights',
	'http://tt.epicplay.com',
	'Can\'t find variable: ZiteReader',
	'jigsaw is not defined',
	'ComboSearch is not defined',
	'http://loading.retry.widdit.com/',
	'atomicFindClose',

	// Facebook borked
	'fb_xd_fragment',

	// ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
	// See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
	'bmi_SafeAddOnload',
	'EBCallBackMessageReceived',

	// See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
	'conduitPage',

	// Moccu defined
	/window\.performance/,
	/__firefox__/
];

module.exports.ignoreErrors = ignoreErrors;

/**
 * The inverse of whitelistUrls and similar to ignoreErrors, but will ignore
 * errors from whole URLs matching a regex pattern or an exact string.
 *
 * @type {Array}
 */
const ignoreUrls = [
	// Google Services
	/google-analytics\.com/,
	/googletagmanager\.com/,
	/googleadservices\.com/,
	/\/(gtm|ga|analytics)\.js/i,

	// Facebook
	/graph\.facebook\.com/i,
	/connect\.facebook\.net/i,

	// Chrome extensions
	/extensions\//i,
	/^chrome:\/\//i,

	// Firefox extensions
	/^resource:\/\//i,

	// Other plugins
	/127\.0\.0\.1:4001\/isrunning/i,  // Cacaoweb
	/webappstoolbarba\.texthelp\.com\//i,
	/metrics\.itunes\.apple\.com\.edgesuite\.net\//i,

	//Moccu defined
	/youtube\.com/,
	/ytimg\.com/,
	/cloudflare\.com/,
	/cloudfront.net/,
	/grmtech\.net/,
	/qtracker/,
	/fast\.fonts\.net/,
	/twinesocial\.com/
];

module.exports.ignoreUrls = ignoreUrls;
