# sentry-config

[![Build Status](https://travis-ci.org/moccu/sentry-config.svg?branch=master)](https://travis-ci.org/moccu/sentry-config)

The basic raven.js configuration we use at moccu

## Installation

```
$ npm install --save @moccu/sentry-config
```

## Usage

The ravenjs config exposes a preconfigured set of `ignoreErrors` and `ignoreUrls`.
Usage may look as follows:

```js
import Raven from 'raven-js';
import {ignoreErrors, ignoreUrls} from '@moccu/sentry-config';


Raven.config('https://<key>@sentry.io/<project>', {
	whitelistUrls: ['example.com'],
	ignoreErrors,
	ignoreUrls
}).install();
```

## License

[MIT](./LICENSE)
