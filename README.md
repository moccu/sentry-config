# sentry-config

![Build Status](https://github.com/moccu/sentry-config/workflows/CI/badge.svg)

The basic sentry sdk configuration we use at moccu

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
config object into each scope of a sentry reporting.

As second (optional) param you can pass a boolean whether to expose, or not
to expose the `Senty`-Object to the global namespace. By default (= `true`)
it  will be exposed.

The usage may look as follows:

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
}, true);
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
});

// or

import {init} from '@moccu/sentry-config';


init({
	dsn: 'https://<key>@sentry.io/<project>',
	whitelistUrls: ['example\\.com'],
	ignoreErrors,
	ignoreUrls
});

```

## Publishing to NPM

All you need to do to tag your commit with the version you want to publish.
The rest is done by github actions.

```
$ git tag 1.0.0
$ git push --follow-tags
```

If the publishing step fails due to authentication reasons you might need to
create a new `NODE_AUTH_TOKEN` (on npm, make sure your'e a member of @moccu)
and set it in the secrets settings of this repository.

## License

[MIT](./LICENSE)
