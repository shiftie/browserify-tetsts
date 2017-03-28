"use strict";

const grunt = require('grunt');
const config = require('../config');

grunt.registerTask('updateHtml', () => {
    const file = 'index.html';
    let html = grunt.file.read(file);

    html = grunt.config('env') === config.env.dev ?
        html.replace(/\.min\.js"/g, '.js"') :
        html.replace(/(\.min)?\.js"/g, '.min.js"');
    grunt.file.write(file, html);
});