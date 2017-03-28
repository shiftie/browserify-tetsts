"use strict";

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const grunt = require('grunt');

// Get .js files from a folder recursively
function walkSync(dir, filelist) {
    filelist =  filelist || [];
    fs.readdirSync(dir).forEach(file => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory()
        ? walkSync(path.join(dir, file), filelist)
        : (/\.js$/.test(file)) ? filelist.concat(path.resolve(path.join(dir, file))) : filelist;
    });

    return filelist;
}

// Maps bundles like {source1: output1, source2: output2 ....}
const getBundles = function(config) {
    let bundles = {};
    const sourceFolder = path.resolve(config.srcDir);
    const outputFolder = path.resolve(config.destDir);

    config.entryPoints.forEach((item) => {
         bundles[path.join(sourceFolder, item)] = path.join(outputFolder, item);
    });

    // Takes all scripts in generatedEntryPoints folder & setups a separate bundle for each file
    config.generatedEntryPoints.forEach((item) => {
        let generatedEntryPoints = walkSync(path.resolve(item));
        let folders = {};

        generatedEntryPoints.map((item) => {
            const dest = item.replace(sourceFolder, outputFolder);
            folders[path.dirname(dest)] = true;
            bundles[item] = dest;
        });
        grunt.config('create-folders', Object.keys(folders));
    });

    return bundles;
}

module.exports = getBundles;