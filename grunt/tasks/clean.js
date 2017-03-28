"use strict";

const grunt = require('grunt');
const rimraf = require('rimraf');

grunt.registerTask('clean', function() {
    let dir = './public';

    if (this.args.length) {
        dir = grunt.config('clean');
        dir = dir[this.args[0]].destDir
    }
    console.log('Cleaning', dir);

    rimraf.sync(dir);
});