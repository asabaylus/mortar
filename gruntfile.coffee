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
        docsCss: '.docs/css/'

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
                    'compass:mortar'
                    'autoprefixer:mortar'
                    'copy:mortarCss'
                ]
            hologramScss:
                files: '<%= app.hologramScss %>/**/*'
                tasks: [
                    'compass:hologram'
                    'autoprefixer:hologram'
                    'copy:hologramCss'
                ]

        clean: ['.tmp/', '.docs/', '.component/']

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
            mortar:
                options:
                    sassDir: '<%= app.mortarScss %>'
                    cssDir: '.tmp/css'

        autoprefixer:
            mortar:
                src: '<%= app.mortarCss %>'
            hologram:
                src: '<%= app.hologramCss %>'

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
            hologram:
                options:
                    stdout: true
                command: 'bundle exec hologram'

        browserSync:
            serve:
                bsFiles:
                    src: [
                        # '.docs/*.html'
                        '.docs/css/*.css'
                    ]
                options:
                    watchTask: true
                    hostnameSuffix: ".xip.io"
                    server:
                        baseDir: '.docs'

    grunt.registerTask 'serve', [
        'clean'
        'shell:hologram'
        'compass'
        'copy'
        'browserSync:serve'
        'watch'
    ]
