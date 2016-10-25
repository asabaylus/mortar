module.exports = {
    mortarSrc: 'src/',
    mortarDest: 'lib/',

    // For mortar Site
    siteStylesSrc: 'src/site/_styles/*.scss',
    siteStylesDest: '.tmp/site/styles/',
    siteSrc: 'src/site/',
    siteDest: '.tmp/site/',

    // For npm package
    mortarModulesSrc: ['src/**/*.js', '!src/**/*Pestle.js', '!src/scripts/**/*'],
    mortarStylesSrc: ['src/**/*.scss', '!src/site/**/*'],
    mortarStylesDest: 'lib/',

    // Icons
    mortarIconDir: 'src/icons/',
    mortarIconsSrc: 'src/icons/*.svg',
    mortarIconsDest: 'lib/icons/',

    // Pestle
    pestleSrc: './src/scripts/pestle/',
    pestleDest: 'packages/pestle'
}
