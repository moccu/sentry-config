const babel = require('rollup-plugin-babel');


module.exports = {
	input: 'src/lib.js',
	output: {
		external: ['Sentry'],
		name: 'sentry-config',
		globals: {
			'@sentry/browser': 'Sentry'
		},
		file: 'dist/lib.js',
		format: 'umd'
	},
	plugins: [
		babel()
	]
};
