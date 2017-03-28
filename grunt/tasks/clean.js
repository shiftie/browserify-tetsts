"use strict";

const grunt = require('grunt');
const rimraf = require('rimraf');

grunt.registerTask('clean', function(arg) {
    let dir = './public';

    if (arg) {
        dir = grunt.config('clean');
        if (dir[arg]) {
            dir = dir[arg].destDir;
        }
    }
    console.log('Cleaning', dir);

    rimraf.sync(dir);
});