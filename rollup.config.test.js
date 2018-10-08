const config = require('./rollup.config');


config.output.file = '.temp/lib.js';
module.exports = config;
