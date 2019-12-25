const { series, src, dest } = require("gulp");
var clean = require("gulp-rimraf");
var ts = require("gulp-typescript");
var exec = require("child_process").exec;
var less = require("gulp-less");

function clearProject() {
    console.log("Clean all files in debug folder");

    return src("debug/*", {
        read: false
    }).pipe(clean());
};

function buildServer () {
    console.log("build typscript");

    return src(["src/**/*.{ts,tsx}", "!src/public", "!src/public/**", "!src/test/client/**"]) // Build all ts/tsx file under src folder then exclude public and client test
        .pipe(ts.createProject("tsconfig.json")())
        .pipe(dest("debug"));
};

function buildResource() {
    console.log("build staticResource");

    return src('src/public/!(less|script)/*')
        .pipe(dest("debug/public"));
};

function webpack() {

    return exec("webpack --colors --progress --config webpack.config.js", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
};

function buildLess() {

    return src("src/public/less/*.less")
        .pipe(less())
        .pipe(dest("debug/public/css/"));
};

function MoveTestFiles() {
    console.log('run move jasmine config');

    return src('src/test/**/jasmine.json')
        .pipe(dest('debug/test'));
};

exports.default = series(
    clearProject,
    buildLess,
    buildResource,
    buildServer,
    webpack);