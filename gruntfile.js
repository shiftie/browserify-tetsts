"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            development: {
                src: [
                    './src/bootstrap.js',
                    './src/app.js'
                ],
                dest: './public/common.js',
                options: {
                    browserifyOptions: { debug: true },
                    transform: [['babelify', { 'presets': ['es2015'] }]],
                    plugin: [
                      ['factor-bundle', { outputs: [
                            './public/bootstrap.js',
                            './public/app.js'
                        ] }]
                    ],
                    watch: true,
                    keepAlive: true,
                }
            },
            production: {
                src: [
                     './src/bootstrap.js',
                     './src/app.js'
                ],
                dest: './public/common.min.js',
                options: {
                    browserifyOptions: { debug: false },
                    transform: [['babelify', { 'presets': ['es2015'] }]],
                    plugin: [
                      ['factor-bundle', { outputs: [
                            './public/bootstrap.min.js',
                            './public/app.min.js'
                        ] }],
                      ['minifyify', { map: false }]
                    ]
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-browserify');

    function setEnv() {
        grunt.config('env', process.env.ENV === 'dev' ? 'dev' : 'prod');

        return 'noop';
    };
    function getBrowserifyConfig(){
        return grunt.config('env') === 'dev' ? 'browserify:development' :
            'browserify:production';
    }

    grunt.registerTask('noop', () => {});
    grunt.registerTask('updateHtml', () => {
        const file = 'index.html';
        let html = grunt.file.read(file);
        html = grunt.config('env') === 'dev' ?
            html.replace(/.min.js"/g, '.js"') :
            html.replace(/.min/g, '').replace(/.js"/g, '.min.js"');
        grunt.file.write(file, html);
    });
    grunt.registerTask('buildDev', ['browserify:development']);
    grunt.registerTask('buildProd', ['browserify:production']);
    grunt.registerTask('default', [
        setEnv(),
        'updateHtml',
        getBrowserifyConfig()
    ]);
};
