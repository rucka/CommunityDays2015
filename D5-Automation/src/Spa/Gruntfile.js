/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/


module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //###########################################################################################################
        //############################################ CLEAN   RESOURCES ############################################
        //###########################################################################################################
        clean: {
            css: ['wwwroot/src/**/*.css', 'wwwroot/styles/*.css'],
            js: ['wwwroot/src/**/*.{js,map}', 'wwwroot/scripts/{js,map}'],
            images: 'wwwroot/images/**/*.{png,jpg,gif}',
            html: 'wwwroot/*.html',
        },
        //###########################################################################################################
        //############################################ DOWNLOAD LIBRARIES ###########################################
        //###########################################################################################################
        bower: {
            install: {
                options: {
                    targetDir: 'wwwroot/src/lib',
                    cleanTargetDir: true,
                    layout: function (type, component, source) {
                        if (component !== 'Chart.js') {
                            return component;
                        }
                        return "Chartjs";
                    }
                }
            }
        },
        //###########################################################################################################
        //############################################ COPY    RESOURCES ############################################
        //###########################################################################################################
        copy: {
            css: {
                files: [{
                    expand: true,
                    dest: 'wwwroot/src',
                    src: 'assets/**/*.css'
                }]
            },
            html: {
                files:
                    [{
                        expand: true,
                        cwd: 'assets/',
                        dest: 'wwwroot',
                        src: '*.html'
                    }]
            },
            js: {
                files: [{
                    expand: true,
                    dest: 'wwwroot/src',
                    src: 'assets/**/*.js'
                }]
            },
        },
        //###########################################################################################################
        //############################################ CSS   COMPRESSION ############################################
        //###########################################################################################################
        cssmin: {
            concat: {
                options: { advanced: false },
                files: { 'wwwroot/styles/site.css': ['wwwroot/src/lib/**/*.css', 'wwwroot/src/assets/**/*.css', 'wwwroot/src/assets/styles/custom.css'] },
            },
            minify: {
                options: { keepSpecialComments: 0 },
                files: { 'wwwroot/styles/site.css': 'wwwroot/styles/site.css' },
            }
        },
        uncss: {
            dist: {
                options: {
                    ignore: [/\.panel*/]
                },
                files: {
                    'wwwroot/styles/site.css': ['wwwroot/home.html', 'wwwroot/partial-landing.html', 'wwwroot/partial-realtime.html']
                }
            }
        },
        //###########################################################################################################
        //############################################ JS    COMPRESSION ############################################
        //###########################################################################################################
        uglify: {
            options: {
                sourceMap: true,
                banner: '/*! Community Days 2015 - <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                //compress: {
                //    drop_console: true
                //},
            },
            files: {
                //src: ['wwwroot/src/**/*.js'],
                src: ['wwwroot/src/lib/domready/*.js', 'wwwroot/src/lib/angular/*.js', 'wwwroot/src/lib/**/*.js', 'wwwroot/src/assets/scripts/config.js', 'wwwroot/src/assets/scripts/*Service.js', 'wwwroot/src/assets/scripts/*Controller.js', 'wwwroot/src/assets/scripts/app.js', '!wwwroot/src/lib/bootstrap/**', '!wwwroot/src/lib/jquery/**'],
                dest: 'wwwroot/scripts/app.js',
            }
        },
        //###########################################################################################################
        //############################################ IMAGE COMPRESSION ############################################
        //###########################################################################################################
        imagemin: {
            target: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    dest: 'wwwroot',
                    src: 'images/**/*.{png,jpg,gif}'
                }]
            }
        },
        //###########################################################################################################
        //############################################ WATCH AND RELOAD  ############################################
        //###########################################################################################################
        watch: {
            all: {
                files: ['bower.json', 'assets/**'],
                tasks: ['build'],
                options: {
                    atBegin: true,
                    livereload: true
                }
            },
            none: {
                files: [],
                tasks: [],
                options: {
                    atBegin: false,
                    livereload: true
                }
            },
        },
        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 8901,
                    base: './wwwroot',
                    debug: true,
                    livereload: true,
                    keepalive: false
                }
            }
        }
    });


    //###########################################################################################################

    grunt.registerTask("css", ["clean:css", "clean:html", "bower", "copy:css", "copy:html", "cssmin:concat", "uncss", "cssmin:minify"]);
    grunt.registerTask("js", ["clean:js", "bower", "copy:js", "uglify"]);
    grunt.registerTask("images", ["clean:images", "imagemin"]);

    grunt.registerTask("build", ["clean", "bower", "copy", "uglify", "imagemin", "cssmin:concat", "uncss", "cssmin:minify"]);
    grunt.registerTask("webserver", ["connect", "watch:none"]);
    grunt.registerTask("dev", ["connect", "watch:all"]);
    grunt.registerTask("default", "dev");

    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-uncss");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
};
