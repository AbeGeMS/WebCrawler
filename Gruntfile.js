module.exports = function (grunt) {
    "use strict";
    var shipDir = "build/ship";
    var debugDir = "build/debug";
    var moveResouce = function(rootDir){
        var serviceFiles = rootDir == debugDir
                        ?['Service/*.js', 'Service/*.js.map']
                        :['Service/*.js'];
        var webFiles = rootDir == debugDir
                    ? ["Web/*.js", "Web/*.js.map"]
                    : ["Web/*.js"];
        var clientFiles = rootDir == debugDir
                        ? ["Web/public/*.js", "Web/public/*.js.map"]
                        : ["Web/public/*.js"];
        return {
            move_compile_jsfile: {
                files: [
                    {
                        src: serviceFiles,
                        dest: rootDir + '/Service/'
                    },
                    {
                        src: webFiles,
                        dest: rootDir + "/Web/"
                    },
                    {
                        src: clientFiles,
                        dest:rootDir + "/Web/public/"
                    }
                ]
            }
        };
    };
    var copyResource = function(rootDir){
        var clientFiles = rootDir == debugDir 
                    ? ["web/public/*.html", "web/public/*.css","web/public/*.ts","web/public/*.tsx"]
                    : ["web/public/*.html", "web/public/*.css"];
            return {
                copy_static_file: {
                       files: [
                        {
                            src:clientFiles, 
                            dest: rootDir +"/"
                        }
                    ]
                }
            };
        
    };
    var moveAll = moveResouce(debugDir);
    var copyAll = copyResource(debugDir); 

    grunt.initConfig({
        ts: {
            dev: {
                src: ["Service/*.ts", "Web/**/*.ts", "Web/*.ts", "Web/public/*.ts","web/public/*.tsx", "!node_modules/**/*.ts"],
                options: {
                    fast:'never',
                    jsx: "react",
                },
            }
        },
        move: moveAll,
        copy: copyAll,
        watch: {
            scripts: {
                files: ['Service/*.ts', "Web/*", "Web/public/*","!node_modules/**/*.ts"],
                tasks: ["ts:dev", "move","copy"],
            }
        },
        nodemon: {
            dev: {
                script: debugDir + "/web/app.js",
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
