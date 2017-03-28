"use strict";

const grunt = require('grunt');

grunt.registerTask('launch-browserify', function(arg){
    grunt.task.run(`build-browserify-config:${arg}`);
    grunt.task.run('create-folders');
    grunt.task.run(`browserify:${arg}`);
});