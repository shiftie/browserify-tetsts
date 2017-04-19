module.exports = {
    'zendesk': {
        'srcDir': '<%= meta.zenAssets %>/src/js',
        'destDir': '<%= meta.zenAssets %>/js',
        'entryPoints': [
            'bootstrap.js',
            'app.js',
        ],
        'commonFilename': 'common.js',
        'generatedEntryPoints': [
            '<%= meta.zenAssets %>/src/js/pages',
        ],
        'prodSuffix': '.min',
    },
    'relate': {
        'srcDir': '<%= meta.rltAssets %>/src/js',
        'destDir': '<%= meta.rltAssets %>/js',
        'entryPoints': [
            'bootstrap.js',
            'app.js',
        ],
        'commonFilename': 'common.js',
        'generatedEntryPoints': [],
        'prodSuffix': '.min',
    },
    'zopim': {
        'srcDir': '<%= meta.zpmAssets %>/src/js',
        'destDir': '<%= meta.zpmAssets %>/js',
        'entryPoints': [
            'bootstrap.js',
            'app.js',
        ],
        'commonFilename': 'common.js',
        'generatedEntryPoints': [],
        'prodSuffix': '.min',
    },
}