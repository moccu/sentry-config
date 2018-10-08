import * as Sentry from '@sentry/browser';


const

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
	ignoreErrors = [
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
	],

	/**
	 * The inverse of whitelistUrls and similar to ignoreErrors, but will ignore
	 * errors from whole URLs matching a regex pattern or an exact string.
	 *
	 * @type {Array}
	 */
	ignoreUrls = [
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
	]
;


function init({dsn, whitelistUrls, tags = {}, ...settings}, expose = true) {
	// Log error if dsn or whitelist is not defined.
	if (!dsn || !whitelistUrls) {
		global.console &&
		global.console.error &&
		global.console.error('Setup sentry using dsn and whitelistUrls.');
		return false;
	}

	// Transform whitelist urls strings (from json) into regular expressions.
	whitelistUrls = whitelistUrls.map((url) => new RegExp(url));

	Sentry.init({dsn, whitelistUrls, ...settings});

	// Add additional tags under 'tags' property from settings.
	Sentry.configureScope((scope) => {
		Object.keys(tags).forEach((key) => scope.setTag(key, tags[key]));
	});

	// Expose Sentry API to global namespace.
	if (expose) {
		global.Sentry = Sentry;
	}

	return true;
}


export {init, ignoreErrors, ignoreUrls};
