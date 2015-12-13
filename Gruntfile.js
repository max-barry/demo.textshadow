module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        /**
        Build tasks
          -  Compile SCSS w/ node-sass
          -  Copy static files like images and fonts
        */
        sass: {
            options: {
                includePaths: [
                    
                    
                    '<%= pkg.paths.bower %>bourbon/app/assets/stylesheets/',
                    '<%= pkg.paths.bower %>reset-scss/',
                    '<%= pkg.paths.bower %>scut/dist/',
                    
                ]
            },
            dist: {
                files: {
                    '<%= pkg.build.css %>app.css': '<%= pkg.src.scss %>app.scss',
                    '<%= pkg.build.css %>fonts.css': '<%= pkg.src.scss %>fonts.scss',
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= pkg.src.images %>",
                        src: "**/*",
                        dest: "<%= pkg.build.images %>"
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= pkg.src.fonts %>",
                        src: ["**/*", "!**/*.json"],
                        dest: "<%= pkg.build.fonts %>"
                    }
                ]
            }
        },
        /**
        Watch tasks
          -  .js files
          -  .scss files
          -  All images in the image src directory
          -  All font files in the font src directory
          -  Template files
        */
        watch: {
            js: {
                files: ["<%= jshint.files %>"],
                tasks: ["jshint", "concat"]
            },
            scss: {
                files: ["<%= pkg.src.scss %>**/**/*.scss"],
                tasks: ["sass", "cmq"]
            },
            images: {
                files: [
                    "<%= pkg.src.images %>**/*.{jpeg,jpg,gif,png,svg}"
                ],
                tasks: ["copy:images"]
            },
            fonts: {
                files: [
                    "<%= pkg.src.fonts %>**/*.{eot,woff,svg,ttf}"
                ],
                tasks: ["copy:fonts"]
            },
            templates: {
                files: [
                    "<%= pkg.paths.templates %>**/*.swig",
                    "<%= pkg.templates.data %>**/*.{json,yml}"
                ],
                tasks: ["assemble"]
            }
        },
        /**
        General
          -  Clean build folder
          -  Javascript documentation
          -  Run local server
        */
        bump: {
            options: {
                push: true,
                pushTo: "origin",
                files: [
                    "package.json",
                    "bower.json"
                ],
                commitFiles: [
                    "package.json",
                    "bower.json"
                ]
            }
        },
        clean: [
            "<%= pkg.paths.build %>",
        ],
        docco: {
            debug: {
                src: ["<%= pkg.src.js %>**/*.js"],
                options: {
                    output: "docs/js/"
                }
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    base: "<%= pkg.paths.build %>"
                }
            }
        },
        /**
        Templating
        */
        assemble : {
            options: {
                engine: "swig",
                data: ["<%= pkg.templates.data %>*.{json,yml}"],
                assets: "<%= pkg.paths.build %>",
                partials: "<%= pkg.templates.partials %>*.swig",
                layoutdir: "<%= pkg.templates.layouts %>",
                layoutext: ".swig",
                layout: "base",
                flatten: true
            },
            pages: {
                src: ["<%= pkg.templates.pages %>*.swig"],
                dest: "<%= pkg.paths.build %>"
            }
        },
        /*
        Performance tasks
          -  Javascript linting
          -  Javascript concatenation
          -  Javascript uglification and minimisation
          -  CSS Minification
          -  Combine media queries in css
          -  Image optimisation
          -  Create WebP format images
          -  HTML prettify (if an Assemble project)
        */
        jshint: {
            files: [
                "<%= pkg.src.js %>**/*.js"
            ],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    alert: true,
                    document: true,
                    window: true
                }
            }
        },
        concat: {
            options: {
                separator: ";\n"
            },
            dist: {
                src: [
                    "<%= pkg.paths.bower %>jquery/dist/jquery.min.js",
                    
                    
                    "<%= pkg.src.js %>**/*.js"
                ],
                dest: "<%= pkg.build.js %>app.js"
            }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n"
            },
            dist: {
                files: {
                    "<%= pkg.build.js %>app.js": ["<%= concat.dist.dest %>"],
                    "<%= pkg.build.js %>modernizr.min.js": ["<%= pkg.paths.bower %>modernizr/modernizr.js"]
                }
            },
        },
        postcss: {
            options: {
                processors: [
                    require("pixrem")(), // add fallbacks for rem units
                    require("autoprefixer-core")({browsers: "last 2 versions"}), // add vendor prefixes
                    require("cssnano")() // minify the result
                ]
            },
            dist: {
                src: "<%= pkg.build.css %>**/*.css"
            }
        },
        cmq: {
            dist: {
                files: {
                    "<%= pkg.build.css %>": ["<%= pkg.build.css %>**/*.css"]
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "<%= pkg.src.images %>",
                    src: ["**/*.{png,jpg,gif,svg}"],
                    dest: "<%= pkg.build.images %>"
                }]
            }
        },
        webp: {
            files: {
                expand: true,
                cwd: "<%= pkg.build.images %>",
                src: "**/*.png",
                dest: "<%= pkg.build.images %>"
            },
            options: {
                binpath: require("webp-bin").path,
                preset: "default",
                verbose: true,
                quality: 80,
                alphaQuality: 80,
                compressionMethod: 6,
                segments: 4,
                psnr: 42,
                sns: 50,
                filterStrength: 40,
                filterSharpness: 3,
                simpleFilter: true,
                partitionLimit: 50,
                analysisPass: 6,
                multiThreading: true,
                lowMemory: false,
                alphaMethod: 0,
                alphaFilter: "best",
                alphaCleanup: true,
                noAlpha: false,
                lossless: false
            }
        },
        prettify: {
            files: {
                expand: true,
                cwd: "<%= pkg.paths.build %>",
                ext: ".html",
                src: ["*.html"],
                dest: "<%= pkg.paths.build %>"
            }
        },
        /**
        Deployment
        */
        surge: {
            'textshadow.demo.mxbry.com': {
                options: {
                    project: '<%= pkg.paths.build %>',
                    domain: 'textshadow.demo.mxbry.com'
                }
            }
        },
    });


    require("load-grunt-tasks")(grunt, {pattern: ["grunt-*", "assemble"]});

    grunt.registerTask("base", ["assemble", "jshint", "concat", "uglify", "sass"])
    grunt.registerTask("build", ["base", "copy"]);
    grunt.registerTask("dist", ["clean", "base", "prettify", "cmq", "postcss", "copy:fonts", "imagemin", "webp"]);
    grunt.registerTask("run", "connect");
    grunt.registerTask("deploy", ["dist", "surge"]);

};
