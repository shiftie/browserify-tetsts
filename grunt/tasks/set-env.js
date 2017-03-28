"use strict";

const grunt = require('grunt');
const config = require('../config');

grunt.registerTask('set-env', function(){
    let env = config.env.dev;

    if (process.env.ENV && config.env[process.env.ENV]) {
        env = process.env.ENV;
    } else if (this.args.length && config.env[this.args[0]]) {
        env = this.args[0];
    }

    grunt.config('env', env);
});