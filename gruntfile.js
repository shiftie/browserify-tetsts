"use strict";

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

module.exports = function (grunt) {
    // Get .js files from a folder recursively
    function walkSync(dir, filelist) {
        filelist =  filelist || [];
        fs.readdirSync(dir).forEach(file => {
            filelist = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), filelist)
            : (file.indexOf('.js') > -1) ? filelist.concat(path.resolve(path.join(dir, file))) : filelist;

        });

        return filelist;
    }

    // Maps bundles like {source1: output1, source2: output2 ....}
    function getBundles(sourceFolder, outputFolder) {
        let bundles = {};
        sourceFolder = path.resolve(sourceFolder);
        outputFolder = path.resolve(outputFolder);
        bundles[`${sourceFolder}/bootstrap.js`] = `${outputFolder}/bootstrap.js`;
        bundles[`${sourceFolder}/app.js`] = `${outputFolder}/app.js`;
        // Takes all scripts in pages subfolder & setups a separate bundle for each file
        let pageScripts = walkSync(`${sourceFolder}/pages`);
        pageScripts.map((item) => {
            const dest = item.replace(sourceFolder, outputFolder);
            console.log(path.dirname(dest));
            mkdirp.sync(path.dirname(dest));
            bundles[item] = item.replace(sourceFolder, outputFolder);
        });

        return bundles;
    }

     function setEnv() {
        grunt.config('env', process.env.ENV === 'dev' ? 'dev' : 'prod');

        return 'noop';
    }

    function getBrowserifyConfig(){
        return grunt.config('env') === 'dev' ? 'browserify:development' :
            'browserify:production';
    }

    // Removes output folder
    rimraf.sync('./public');
    // Fetches bundles list
    const srcDir = './src';
    const destDir = './public';
    const bundles = getBundles(srcDir, destDir);

    grunt.initConfig({
        browserify: {
            development: {
                src: Object.keys(bundles),
                dest: `${destDir}/common.js`,
                options: {
                    browserifyOptions: { debug: true },
                    transform: [['babelify', { 'presets': ['es2015'] }]],
                    plugin: [
                        ['factor-bundle',
                            {
                                outputs: Object.keys(bundles).map((item) => bundles[item])
                            }
                        ]
                    ],
                    watch: true,
                    keepAlive: true,
                }
            },
            production: {
                src: Object.keys(bundles),
                dest: `${destDir}/common.min.js`,
                options: {
                    browserifyOptions: { debug: false },
                    transform: [['babelify', { 'presets': ['es2015'] }]],
                    plugin: [
                        ['factor-bundle',
                            {
                                outputs: Object.keys(bundles).map((item) => bundles[item].replace('.js', '.min.js'))
                            }
                        ],
                        ['minifyify', { map: false }]
                    ],
                    keepAlive: true, // Mendatory otherwise large imports fail :X
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('noop', () => {});
    grunt.registerTask('updateHtml', () => {
        const file = 'index.html';
        let html = grunt.file.read(file);

        html = grunt.config('env') === 'dev' ?
            html.replace(/.min.js"/g, '.js"') :
            html.replace(/.min/g, '').replace(/.js"/g, '.min.js"');
        grunt.file.write(file, html);
    });
    grunt.registerTask('default', [
        setEnv(),
        'updateHtml',
        getBrowserifyConfig()
    ]);
};
