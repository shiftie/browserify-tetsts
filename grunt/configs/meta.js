module.exports = {
    'zenThemes': 'wordpress/wp-content/themes',
    'zpmThemes': 'zopim/wp-content/themes',
    'rltThemes': 'wordpress/wp-content/themes',
    'zenAssets': 'public/assets',
    'zpmAssets': 'public/assets/sites/zopim',
    'rltAssets': 'public/assets/sites/relate',
    'zopimPHPFiles': [
        '<%= meta.zpmThemes %>/zopim-en/*.php',
        '<%= meta.zpmThemes %>/zopim-en/page-templates/*.php',
        '<%= meta.zpmThemes %>/zopim-en/page-templates/parts/*.php'
    ]
}