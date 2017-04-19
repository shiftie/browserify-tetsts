const env = require('./configs/env');
const js = require('./configs/js');
const images = require('./configs/images');
const meta = require('./configs/meta');
const jscs = require('./configs/jscs');
const clean = require('./configs/clean');

module.exports = {
    'env': env,
    'js': js,
    'images': images,
    'meta': meta,
    'jscs': jscs,
    'clean': clean,
};