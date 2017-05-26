module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            dev: {
                src: ["Service/*.ts","!node_modules/**/*.ts"],
                options: {
                    fast:'never',
                },
            }
        },
        move: {
            move_compile_jsfile: {
                src: ['Service/*.js','Service/*.js.map'],
                dest:'build/'
            }
        },
        watch: {
            scripts: {
                files: ['Service/*.ts',"!node_modules/**/*.ts"],
                tasks: ["ts:dev","move"],
            }
        },
        nodemon: {
            dev: {
                script:"build/webCrawler.js",
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-move");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");

    grunt.registerTask("default", ["watch"]);
};
