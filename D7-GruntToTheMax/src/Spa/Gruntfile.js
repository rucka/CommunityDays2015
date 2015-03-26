/// <binding />
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
            css: ['wwwroot/src/**/*.{css,less}', 'wwwroot/styles/*.css'],
            js: ['wwwroot/src/**/*.{js,map,ts}', 'wwwroot/scripts/*.{js,map}'],
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
                    src: 'assets/**/*.{css,less}'
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
                    src: 'assets/**/*.ts'
                }]
            },
        },
        //###########################################################################################################
        //############################################ LESS COMPILATION #############################################
        //###########################################################################################################
        less: {
            transform: {
                options: {
                    paths: ['wwwroot/src/assets/styles/'],  //base paths for the @import less function
                    modifyVars: {
                        //'background': 'red'
                        //'background': 'linear-gradient(black, white)'
                    }
                },
                files: {
                    'wwwroot/src/assets/styles/custom.css': 'wwwroot/src/assets/styles/*.less'
                }
            }
        },
        //###########################################################################################################
        //############################################ CSS   COMPRESSION ############################################
        //###########################################################################################################
        autoprefixer: {
            options: {
                //remove : false,
                //browsers: ['last 2 versions'],
                browsers: ['> 1%', 'Opera > 3', 'Firefox > 3', 'ie 8', 'ie 9'],
            },
            target: {
                expand: true,
                src: 'wwwroot/src/assets/styles/*.css',
                ext: '.prefix.css'
            }
        },
        cssmin: {
            concat: {
                options: { advanced:false },
                files: { 'wwwroot/styles/site.css': ['wwwroot/src/lib/**/*.css', 'wwwroot/src/assets/**/*.prefix.css', 'wwwroot/src/assets/styles/custom.prefix.css'] },
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
        //############################################ TYPESCRIPT COMPILATION #######################################
        //###########################################################################################################
        typescript: {
            base: {
                dest: 'wwwroot/scripts/compiled.js',
                src: 'wwwroot/src/assets/scripts/*.ts',
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true
                }
            }
        },
        //###########################################################################################################
        //############################################ JS    COMPRESSION ############################################
        //###########################################################################################################
        uglify: {
            options: {
                sourceMap: true,
                sourceMapIn: 'wwwroot/scripts/compiled.js.map',
                banner: '/*! Community Days 2015 - <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                compress: {
                    drop_console: true
                },
            },
            files: {
                src: ['wwwroot/src/lib/domready/*.js', 'wwwroot/src/lib/angular/*.js', 'wwwroot/src/lib/**/*.js', 'wwwroot/scripts/compiled.js', '!wwwroot/src/lib/bootstrap/**', '!wwwroot/src/lib/jquery/**'],
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
            fake: {
                files: ['bower.json', 'assets/**'],
                tasks: ['build'],
                options: {
                    atBegin: true,
                    livereload: true
                }
            },
            real: {
                files: ['bower.json', 'assets/**'],
                tasks: ['build-real'],
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
            }
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
        },
        //###########################################################################################################
        //################################################ UNIT TESTS AND VALIDATION ################################
        //###########################################################################################################
        jshint: {
            files: ['wwwroot/scripts/compiled.js']
        },
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                      'wwwroot/scripts/app.js',
                      'assets/specs/*.js',
                    ]
                }
            }
        },
    });


    //###########################################################################################################

    grunt.registerTask("css", ["clean:css", "clean:html", "bower", "copy:css", "less:transform", "autoprefixer", "copy:html", "autoprefix", "cssmin:concat", "uncss", "cssmin:minify"]);
    grunt.registerTask("js", ["clean:js", "bower", "copy:js", "preprocess", "typescript", "jshint", "uglify"]);
    grunt.registerTask("images", ["clean:images", "imagemin"]);

    grunt.registerTask("preprocess", function () { //default behaviour uses mock
        var basefilename = 'wwwroot/src/assets/scripts/yahooService';
        var fakepath = basefilename + '-fake.ts';
        var realpath = basefilename + '-real.ts';
        var dstpath = basefilename + '.ts';

        var srcpath = fakepath;

        var useRealService = grunt.config.get('useRealService');
        if (useRealService) {
            srcpath = realpath;
        } 
        grunt.file.copy(srcpath, dstpath);

        grunt.file.delete(fakepath);
        grunt.file.delete(realpath);
    });

    grunt.registerTask("build", ["clean", "bower", "copy", "preprocess", "typescript", "jshint", "uglify", "imagemin", "less", "autoprefixer", "cssmin:concat", "uncss", "cssmin:minify"]);
    grunt.registerTask("build-real", function () {
        grunt.config.set('useRealService', true);
        grunt.task.run("build");
    });
    

    grunt.registerTask("dev", ["connect", "watch:fake"]);
    grunt.registerTask("dev-real", ["connect", "watch:real"]);
    grunt.registerTask("webserver", ["connect", "watch:none"]);

    grunt.registerTask("test", ["js", "karma"]);

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
    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
