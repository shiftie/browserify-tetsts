module.exports = {
    'env': {
        'dev': 'dev',
        'prod': 'prod',
    },
    'js': {
        'zendesk': {
            'srcDir': './src/js',
            'destDir': './public/js',
            'entryPoints': [
                'bootstrap.js',
                'app.js',
            ],
            'commonFilename': 'common.js',
            'generatedEntryPoints': [
                './src/js/pages',
            ],
            'prodSuffix': '.min',
        },
    },
    'images': {
        files: {
            expand: true,
            src: [
                './img/*.{png,jpg,jpeg}',
                './img/{,*/}*.{png,jpg,jpeg}'
            ],
            dest: ''
        }
    }
};