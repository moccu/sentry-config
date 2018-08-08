# ravenjs-config

[![Build Status](https://travis-ci.org/moccu/ravenjs-config.svg?branch=master)](https://travis-ci.org/moccu/ravenjs-config)

The basic raven.js configuration we use at moccu

## Installation

```
$ npm install --save @moccu/ravenjs-config
```

## Usage

The ravenjs config exposes a preconfigured set of `ignoreErrors` and `ignoreUrls`.
Usage may look as follows:

```js
import Raven from 'raven-js';
import {ignoreErrors, ignoreUrls} from '@moccu/ravenjs-config';


Raven.config('https://<key>@sentry.io/<project>', {
	whitelistUrls: ['example.com'],
	ignoreErrors,
	ignoreUrls
});
```

## License

[MIT](./LICENSE)
