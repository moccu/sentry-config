const
	assert = require('assert'),
	{ESLint} = require('eslint'),
	eslint = new ESLint(),

	lib = require('../dist/lib'),
	Sentry = require('@sentry/browser')
;

assert.deepStrictEqual(
	Object.keys(lib),
	[
		'ignoreErrors',
		'ignoreUrls',
		'init'
	],
	'expose expected settings'
);

assert.ok(
	Array.isArray(lib.ignoreUrls),
	'ignore urls are available'
);

assert.ok(
	Array.isArray(lib.ignoreErrors),
	'ignore errors are available'
);

// Actually run init() against the real Sentry SDK so a breaking API change
// (e.g. removed init options or scope methods) fails the test instead of
// silently shipping.
assert.strictEqual(
	lib.init({
		dsn: 'https://public@sentry.example.com/1',
		whitelistUrls: ['example\\.com'],
		ignoreUrls: [/ignored\.example\.com/],
		tags: {source: 'test'}
	}, false),
	true,
	'init() succeeds with legacy whitelistUrls/ignoreUrls option names'
);

assert.strictEqual(
	Sentry.getCurrentScope().getScopeData().tags.source,
	'test',
	'init() applies tags via the current scope'
);

assert.strictEqual(
	lib.init({whitelistUrls: ['example\\.com']}),
	false,
	'init() requires a dsn'
);

assert.strictEqual(
	lib.init({dsn: 'https://public@sentry.example.com/1'}),
	false,
	'init() requires whitelistUrls/allowUrls'
);

// Eslint:
eslint.lintFiles(['**/*.js'])
	.then(reports => {
		ESLint.getErrorResults(reports).forEach((error) =>
			error.messages.forEach((message) =>
				global.console.error(
					message.message,
					`(${message.ruleId})`,
					`\n\t${error.filePath}:${message.line}:${message.column}`
				)
			)
		);

		reports.forEach((report) => {
			assert.strictEqual(report.errorCount, 0);
			assert.strictEqual(report.warningCount, 0);
		});
	})
	.catch(e => {
		// Without this, an assertion failure (lint errors/warnings found) or any
		// other error here would be logged but leave the process exit code at 0.
		global.console.error(`Failed to run eslint (${e})`);
		process.exitCode = 1;
	});
