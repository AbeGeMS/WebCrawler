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
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-move")
    grunt.registerTask("default", ["ts:dev","move"]);
};
