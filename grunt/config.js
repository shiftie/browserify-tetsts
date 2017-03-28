module.exports = {
    'env': {
        'dev': 'dev',
        'prod': 'prod',
    },
    'js': {
        'zendesk': {
            'srcDir': './src',
            'destDir': './public',
            'entryPoints': [
                'bootstrap.js',
                'app.js',
            ],
            'commonFilename': 'common.js',
            'generatedEntryPoints': [
                './src/pages',
            ],
            'prodSuffix': '.min',
        },
    }
};