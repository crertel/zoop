var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.css')
                                    .pipe(concat('main.css'))
                                    .pipe(gulp.dest('static/css'))
                                    .pipe(rename({suffix: '.min'}))
                                    .pipe(gulp.dest('static/css'))
                                    .pipe(notify({ message: 'Styles task complete'}));
});

gulp.task('scripts-client', function() {
    return gulp.src('src/client/**/*.js')
                                     .pipe(jshint('.client.jshintrc'))
                                     .pipe(jshint.reporter('default'))
                                     .pipe(jshint.reporter('fail'))
                                     .pipe(concat('main-client.js'))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(rename({suffix: '.min'}))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(notify({ message: 'Built client scripts.' }));
});

gulp.task('scripts-server', function() {
    return gulp.src('src/server/**/*.js')
                                     .pipe(jshint('.server.jshintrc'))
                                     .pipe(jshint.reporter('default'))
                                     .pipe(jshint.reporter('fail'))
                                     .pipe(concat('main-server.js'))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(rename({suffix: '.min'}))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(notify({ message: 'Built server scripts.' }));
});

gulp.task('clean', function(cb) {
    return del(['static/css', 'static/js'], cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts-client', 'scripts-server');
});
