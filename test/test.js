const
	assert = require('assert'),
	chalk = require('chalk'),
	{ESLint} = require('eslint'),
	eslint = new ESLint(),

	lib = require('../dist/lib')
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

// Eslint:
eslint.lintFiles(['**/*.js'])
	.then(reports => {
		ESLint.getErrorResults(reports).forEach((error) =>
			error.messages.forEach((message) =>
				global.console.error(
					chalk.red(message.message),
					chalk.white(`(${message.ruleId})`),
					chalk.white(`\n\t${error.filePath}:${message.line}:${message.column}`)
				)
			)
		);

		reports.forEach((report) => {
			assert.strictEqual(report.errorCount, 0);
			assert.strictEqual(report.warningCount, 0);
		});
	})
	.catch(e => console.error(`Failed to run eslint (${e})`));
