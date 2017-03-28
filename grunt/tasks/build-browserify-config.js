"use strict";

const path = require('path');
const grunt = require('grunt');
const config = require('../config');
const getBundles = require('../bundles');

const getConfig = (buildConfig) => {
    const bundles = getBundles(buildConfig);
    const debug = grunt.config('env') === config.env.dev;
    console.log('once?', debug);
    return {
        src: Object.keys(bundles),
        dest: path.join(
            buildConfig.destDir,
            debug ? buildConfig.commonFilename : buildConfig.commonFilename.replace(/\.js$/, `${buildConfig.prodSuffix}.js`)
        ),
        options: {
            browserifyOptions: { debug: debug },
            transform: [['babelify', { 'presets': ['es2015'] }]],
            plugin: [
                ['factor-bundle',
                    {
                        outputs:
                        debug ? Object.keys(bundles).map((item) => bundles[item]) :
                                Object.keys(bundles).map((item) => bundles[item].replace(/\.js$/, `${buildConfig.prodSuffix}.js`))
                    }
                ],
                ['minifyify', {
                    map: debug,
                    minify: !debug,
                    uglify: !debug,
                }]
            ],
            watch: debug,
            keepAlive: true,
        }
    };
}

grunt.registerTask('build-browserify-config', function(arg) {
    grunt.config('browserifyConfig', getConfig(config.js[arg]));
});