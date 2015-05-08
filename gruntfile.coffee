'use strict'

module.exports = (grunt) ->
    # Show elapsed time after tasks run
    require('time-grunt') grunt

    # Load all grunt tasks
    require('load-grunt-tasks') grunt

    # Load bower.json, for use in variables
    bwr = require('./bower.json')

    # Configurable Paths
    appConfig =
        cssDir: '.tmp/css/'
        docsCss: 'docs/css/'
        mortarCss: '.tmp/css/mortar.css'
        mortarScss: 'app/src/styles/mortar.scss'
        mortarScssDir: 'app/src/styles/'
        hologramCss: '.tmp/css/hologram.css'
        hologramScss: 'app/doc_src/sass/hologram.scss'
        hologramScssDir: 'app/doc_src/sass/'

    grunt.initConfig
        app: appConfig

        watch:
            hologram:
                files: [
                    'app/assets/*'
                ]
                tasks: 'shell:hologram'
            mortarScss:
                files: '<%= app.mortarScssDir %>/**/*.scss'
                tasks: [
                    'processMortarCss'
                    'copy:mortarCss'
                    'shell:hologram'
                ]
            hologramScss:
                files: '<%= app.hologramScss %>/**/*'
                tasks: [
                    'sass:hologram'
                    'autoprefixer:hologram'
                    'copy:hologramCss'
                ]

        clean: ['.tmp/', 'docs/', 'component/']

        # CSS Processing

        sass:
            options:
                bundleExec: true
                require: [
                    'sass-globbing'
                    'susy'
                ]
            hologram:
                options:
                    loadPath: [ '<%= app.hologramScssDir %>' ]
                    require: [
                        'sass-globbing'
                        'singularitygs'
                        'breakpoint'
                    ]
                files: [
                    expand: true
                    cwd: '<%= app.hologramScssDir %>'
                    src: 'hologram.scss'
                    dest: '<%= app.cssDir %>'
                    ext: '.css'
                ]
            mortar:
                options:
                    loadPath: [ '<%= app.mortarScssDir %>' ]
                files: [{
                    expand: true
                    cwd: '<%= app.mortarScssDir %>'
                    src: 'mortar.scss'
                    dest: '<%= app.cssDir %>'
                    ext: '.css'
                }]

        autoprefixer:
            mortar:
                src: '<%= app.mortarCss %>'
            hologram:
                src: '<%= app.hologramCss %>'

        cssmin:
            mortar:
                files:
                    'docs/css/mortar.min.css' : ['<%= app.mortarCss %>']
                options:
                    report: 'gzip'

        # CSS Tests

        csscss:
            options:
                bundleExec: true
                minMatch: 4
            mortar:
                src: ['<%= app.mortarCss %>']

        csslint:
            options:
                csslintrc: '.csslintrc'
                formatters: [
                    {
                        id: 'csslint-xml'
                        dest: 'css-lint-report.xml'
                    }
                ]
            mortar:
                src:'<%= app.mortarCss %>'

        scsslint:
            allfiles: [
                '<%= app.mortarScssDir %>/**/*.scss'
            ]
            options:
                bundleExec: true
                colorizeOutput: true
                config: '.scss-lint.yml'
                reporterOutput: 'scss-lint-report.xml'


        # Doing things

        copy:
            mortarCss:
                expand: true
                flatten: true
                src: '<%= app.mortarCss %>'
                dest: '<%= app.docsCss %>'
            hologramCss:
                expand: true
                flatten: true
                src: '<%= app.hologramCss %>'
                dest: '<%= app.docsCss %>'
            componentCss:
                expand: true
                flatten: true
                src: '<%= app.mortarCss %>'
                dest: 'component'
            componentScss:
                expand: true
                cwd: '<%= app.mortarScssDir %>'
                src: './**'
                dest: 'component/scss'
            componentBower:
                expand: true
                flatten: true
                src: './bower.json'
                dest: 'component/'

        shell:
            update:
                options:
                    stdout: true
                command: 'bundle && npm install && bower install'
            hologram:
                options:
                    stdout: true
                command: 'bundle exec hologram'

        browserSync:
            serve:
                bsFiles:
                    src: [
                        'docs/*.html'
                        'docs/css/*.css'
                    ]
                options:
                    open: "external"
                    watchTask: true
                    hostnameSuffix: ".xip.io"
                    server:
                        baseDir: 'docs'

        buildcontrol:
            options:
                commit: true
                push: true
                remote: 'git@github.com:natgeo/mortar.git'
                connectCommits: false
            pages:
                options:
                    dir: 'docs'
                    branch: 'gh-pages'
                    message: 'Built %sourceName% pages from commit %sourceCommit% on branch %sourceBranch%'
            component:
                options:
                    dir: 'component'
                    branch: 'component'
                    message: 'Built %sourceName% component from commit %sourceCommit% on branch %sourceBranch%'
                    tag: bwr.version

    grunt.registerTask 'serve', [
        'clean'
        'shell'
        'processMortarCss'
        'sass:hologram'
        'copy'
        'browserSync:serve'
        'watch'
    ]

    grunt.registerTask 'build', [
        'clean'
        'shell:hologram'
        'processMortarCss'
        'sass:hologram'
        'copy'
    ]

    grunt.registerTask 'deploy', [
        'build'
        'buildcontrol:pages'
        'buildcontrol:component'
    ]

    grunt.registerTask 'test', [
        'scsslint'
        'csslint'
        'csscss'
    ]

    grunt.registerTask 'processMortarCss', [
        'sass:mortar'
        'autoprefixer:mortar'
        'cssmin'
    ]
