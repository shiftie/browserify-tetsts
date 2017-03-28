"use strict";

const grunt = require('grunt');
const mkdirp = require('mkdirp');

grunt.registerTask('create-folders', function() {
    const folders = grunt.config('create-folders');

    folders && folders.forEach((folder) => {
        if(!grunt.file.isDir(folder)) {
            console.log('Creating folder', folder);
            mkdirp.sync(folder);
        }
    });
});