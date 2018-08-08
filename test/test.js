'use strict';

const
	assert = require('assert'),
	config = require('../index')
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
