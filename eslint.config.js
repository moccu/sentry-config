const
	globals = require('globals'),
	moccu = require('@moccu/eslint-config')
;

module.exports = [
	moccu.configs['flat/recommended'],
	{
		ignores: ['dist/**', '.temp/**']
	},
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.browser
			}
		}
	}
];
