var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var rename = require('gulp-rename');

gulp.task('clean', function () {
    return del(['./bin/jquery.feather-pager.min.js']);
});

gulp.task('reduce', ['clean'], function() {
    return gulp.src('./src/jquery.feather-pager.js')
        .pipe(uglify())
        .pipe(minify())
        .pipe(rename('./bin/jquery.feather-pager.min.js'))
        .pipe(gulp.dest("./"));
});

gulp.task('default', ['reduce'], function () { });