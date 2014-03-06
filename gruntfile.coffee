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

        clean: ['.tmp/', '.docs/', '.component/']

        compass:
            mortar:
                options:
                    sassDir: '<%= app.mortarScss %>'
                    cssDir: '.tmp/css'
                    bundleExec: true
                    debugInfo: false
                    trace: true
                    require: [
                        'sass-globbing'
                        'modular-scale'
                    ]

        autoprefixer:
            mortar:
                src: '<%= app.mortarCss %>'

        copy:
            mortarCss:
                expand: true
                flatten: true
                src: '<%= app.mortarCss %>'
                dest: '<%= app.docsCss %>'


        shell:
            hologram:
                options:
                    stdout: true
                command: 'bundle exec hologram'

        browser_sync:
            serve:
                bsFiles:
                    src: [
                        # '.docs/*.html'
                        '.docs/css/*.css'
                    ]
                options:
                    watchTask: true
                    server:
                        baseDir: '.docs'

    grunt.registerTask 'serve', [
        'clean'
        'shell:hologram'
        'compass:mortar'
        'copy'
        'browser_sync:serve'
        'watch'
    ]
