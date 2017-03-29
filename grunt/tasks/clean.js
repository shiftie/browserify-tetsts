"use strict";

const grunt = require('grunt');
const rimraf = require('rimraf');
const path = require('path');

grunt.registerTask('clean', function(arg) {
    let dir = './public';

    if (arg) {
        const config = grunt.config('clean');
        if (config[arg] && config[arg].destDir) {
            dir = config[arg].destDir;
        }
    }
    console.log('Cleaning', path.join(__dirname, dir));

    rimraf.sync(path.join(__dirname, dir));
});