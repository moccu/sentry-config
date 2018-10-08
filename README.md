# sentry-config

[![Build Status](https://travis-ci.org/moccu/sentry-config.svg?branch=master)](https://travis-ci.org/moccu/sentry-config)

The basic raven.js configuration we use at moccu

## Installation

```
$ npm install --save @moccu/sentry-config
```

## Usage

### Init

The sentry-config exposes an `init(...)` function to simply setup sentry with a
given config object. The config object should contain at least a `dsn`
and a list of strings called `whitelistUrls`. The init function adds additional
tasks to the initialization process for the sentry sdk. It converts all
whitelistUrls into regular expressions and adds additional `tags` from the
config object into each scope of a sentry reporting. The usage may look as
follows:

```js
import {init} from '@moccu/sentry-config';


init({
	dsn: 'https://<key>@sentry.io/<project>',
	whitelistUrls: ['example\\.com'],
	release: '1.0.0',
	environment: 'live',
	attachStacktrace: true,
	tags: {
		source: 'frontend'
	}
});
```

### Presets

The sentry-config exposes a preconfigured set of `ignoreErrors` and `ignoreUrls`.
Usage may look as follows:

```js
import * as Sentry from '@sentry/browser';
import {ignoreErrors, ignoreUrls} from '@moccu/sentry-config';


Sentry.init({
	dsn: 'https://<key>@sentry.io/<project>',
	whitelistUrls: [/example\.com/],
	ignoreErrors,
	ignoreUrls
}).install();

// or

import {init} from '@moccu/sentry-config';


init({
	dsn: 'https://<key>@sentry.io/<project>',
	whitelistUrls: ['example\\.com'],
	ignoreErrors,
	ignoreUrls
});

```

## License

[MIT](./LICENSE)
