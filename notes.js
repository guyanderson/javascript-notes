==============gulpfiles.js===============

var gulp = require('gulp');  //  npm install gulp --save-dev
var concat = require('gulp-concat');     // npm install gulp-concat --save-dev
var browserify = require('browserify');  //  npm install browserify --save-dev
var source = require('vinyl-source-stream');     // npm install vinyl-source-stream --save-dev
var uglify = require('gulp-uglify');     // npm install gulp-uglify --save-dev
var utilities = require('gulp-util');    //    npm install gulp-util --save-dev
var del = require('del');    //    npm install del --save-dev
var jshint = require('gulp-jshint');     // npm install jshint --save-dev && npm install gulp-jshint --save-dev

var buildProduction = utilities.env.production;

gulp.task('concatInterface', function(){
    return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], function(){
    return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
    return gulp.src("./build/js/apps.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("clean", function(){
    return del(['build', 'tmp']);
});

gulp.task("build", ['clean'], function(){
    if (buildProduction) {
        gulp.start('minifyScripts');
    } else {
        gulp.start('jsBrowserify');
    }
});

gulp.task('jshint', function(){
    return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

==================html================

<!DOCTYPE html>
<html>
    <head>
        <script src="js/jquery-3.2.1.js"></script>
        <script type="text/javascript" src="build/js/app.js"></script>
        <title></title>
    </head>
    <body>
    </body>
</html>

==============files=============

.gitignore
    node_modules/
    .DS_Store
gulpfile.js
index.html

==============folders===============
.tmp
build/js
    app.js
js
    jquery-3.2.1.js
    all js files .js and -interface.js
node_modules
tmp
    allConcat.js
