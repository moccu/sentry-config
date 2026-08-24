import {babel} from '@rollup/plugin-babel';


export default {
	input: 'src/lib.js',
	output: {
		name: 'sentry-config',
		globals: {
			'@sentry/browser': 'Sentry'
		},
		file: 'dist/lib.js',
		format: 'umd'
	},
	external: ['@sentry/browser', 'Sentry'],
	plugins: [
		babel({babelHelpers: 'bundled'})
	]
};
