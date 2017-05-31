module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            dev: {
                src: ["Service/*.ts", "Web/**/*.ts", "Web/*.ts", "Web/public/*.ts", "!node_modules/**/*.ts"],
                options: {
                    fast:'never',
                },
            }
        },
        move: {
            move_compile_jsfile: {
                files: [
                    {
                        src: ['Service/*.js', 'Service/*.js.map'],
                        dest: 'build/Service/'
                    },
                    {
                        src: ["Web/*.js", "Web/*.js.map"],
                        dest: "build/Web/"
                    },
                    {
                        src: ["Web/public/*.js", "Web/public/*.js.map"],
                        dest:"build/Web/public/"
                    }
                ]
            }
        },
        copy: {
            copy_static_file: {
                files: [
                    {
                        src: ["web/public/*.html"],
                        dest: "build/"
                    }
                ]
            }
        },
        watch: {
            scripts: {
                files: ['Service/*.ts', "Web/*", "Web/public/*","!node_modules/**/*.ts"],
                tasks: ["ts:dev", "move","copy"],
            }
        },
        nodemon: {
            dev: {
                script: "build/web/app.js",
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-move");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");

    grunt.registerTask("default", ["watch"]);
};
