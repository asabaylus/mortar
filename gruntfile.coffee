'use strict'

module.exports = (grunt) ->
    # Show elapsed time after tasks run
    require('time-grunt') grunt

    # Load all grunt tasks
    require('load-grunt-tasks') grunt

    # Configurable Paths
    appConfig =
        mortarScss: 'app/src/sass'
        mortarCss: '.tmp/css/mortar.css'
        hologramScss: 'app/doc_src/sass'
        hologramCss: '.tmp/css/hologram.css'
        docsCss: 'docs/css/'

    grunt.initConfig
        app: appConfig

        watch:
            hologram:
                files: [
                    'app/src/**/*'
                    'app/assets/*'
                ]
                tasks: 'shell:hologram'
            mortarScss:
                files: '<%= app.mortarScss %>/**/*'
                tasks: [
                    'processMortarCss'
                    'copy:mortarCss'
                ]
            hologramScss:
                files: '<%= app.hologramScss %>/**/*'
                tasks: [
                    'compass:hologram'
                    'autoprefixer:hologram'
                    'copy:hologramCss'
                ]

        clean: ['.tmp/', 'docs/', '.component/']

        # CSS Processing

        compass:
            options:
                bundleExec: true
                debugInfo: false
                require: [
                    'sass-globbing'
                    'modular-scale'
                    'breakpoint'
                    'singularitygs'
                ]
            hologram:
                options:
                    sassDir: '<%= app.hologramScss %>'
                    cssDir: '.tmp/css'
                    fontsDir: 'app/bower_components/icongs/fonts'
                    httpFontsDir: 'bower_components/icongs/fonts'
            mortar:
                options:
                    sassDir: '<%= app.mortarScss %>'
                    cssDir: '.tmp/css'

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

        scsslint:
            allfiles: [
                '<%= app.mortarScss %>/**/*.scss'
            ]
            options:
                config: '.scss-lint.yml'
                reporterOutput: 'scss-lint-report.xml'

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

        csscss:
            options:
                bundleExec: true
                failWhenDuplicates: true
                minMatch: 4
                shorthand: false
                verbose: true
            mortar:
                src: ['<%= app.mortarCss %>']

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
                        # 'docs/*.html'
                        'docs/css/*.css'
                    ]
                options:
                    watchTask: true
                    hostnameSuffix: ".xip.io"
                    server:
                        baseDir: 'docs'

    grunt.registerTask 'serve', [
        'clean'
        'shell'
        'processMortarCss'
        'compass:hologram'
        'copy'
        'browserSync:serve'
        'watch'
    ]

    grunt.registerTask 'processMortarCss', [
        # 'scsslint'
        'compass:mortar'
        'csscss'
        'autoprefixer:mortar'
        'cssmin'
    ]
