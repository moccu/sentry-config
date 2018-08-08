'use strict';

const
	assert = require('assert'),
	chalk = require('chalk'),
	config = require('../index'),
	eslint = require('eslint'),
	report = new eslint.CLIEngine().executeOnFiles(['**/*.js'])
;

assert.deepEqual(
	Object.keys(config),
	[
		'ignoreErrors',
		'ignoreUrls'
	],
	'expose expected settings'
);

assert.ok(
	Array.isArray(config.ignoreUrls),
	'ignore urls are available'
);

assert.ok(
	Array.isArray(config.ignoreErrors),
	'ignore errors are available'
);


// Eslint:
eslint.CLIEngine.getErrorResults(report.results).forEach((error) =>
	error.messages.forEach((message) =>
		global.console.error(
			chalk.red(message.message),
			chalk.white(`(${message.ruleId})`),
			chalk.white(`\n\t${error.filePath}:${message.line}:${message.column}`)
		)
	)
);
assert.equal(report.errorCount, 0);
assert.equal(report.warningCount, 0);
