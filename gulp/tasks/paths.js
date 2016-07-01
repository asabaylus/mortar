module.exports = {
    siteStylesSrc: 'app/site/_styles/*.scss',
    siteStylesDest: '.tmp/site/styles/',

    siteSrc: 'app/site/',
    siteDest: '.tmp/site/',

    mortarStylesSrc: 'app/{styles,icons}/**/*.scss',
    mortarStylesDest: 'lib/',

    mortarIconDir: 'app/icons/',
    mortarIconsSrc: 'app/icons/*.svg',
    mortarIconsDest: 'lib/icons/',

    mortarModulesSrc: ['app/modules/**/*.{js,jsx,scss,css}', '!app/modules/**/*Pestle.js'],
    mortarModulesDest: 'lib/modules',

    mortarSrc: 'app/',
    mortarDest: 'lib/',

    pestleSrc: './app/scripts/pestle/',
    pestleDest: 'packages/pestle'
}
