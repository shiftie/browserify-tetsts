"use strict";

const config = require('./grunt/config');

module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            zendesk: {
                destDir: config.js.zendesk.destDir,
            },
        },
        browserify: '<%= browserifyConfig %>',
    });

    grunt.registerTask('default', [
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
};
