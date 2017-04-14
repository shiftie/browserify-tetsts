"use strict";

const config = require('./grunt/config');

module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            zendesk: [ config.js.zendesk.destDir ],
        },
        imagemin: config.images,
        browserify: '<%= browserifyConfig %>',
    });

    grunt.registerTask('default', [
        'imagemin',
        'zendesk-dev',
    ]);

    grunt.registerTask('zendesk-dev', [
        'set-env:dev',
        'clean:zendesk',
        'update-html',
        'launch-browserify:zendesk'
    ]);

    grunt.registerTask('zendesk-dist', [
        'set-env:prod',
        'clean:zendesk',
        'update-html',
        'launch-browserify:zendesk'
    ]);

    grunt.loadTasks('./grunt/tasks');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
};
