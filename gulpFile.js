var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('karma').server;


gulp.task('karma-CI', function (done) {
    var conf = require('./karma.common.js');
    conf.singleRun = true;
    conf.browsers = ['PhantomJS'];
    conf.basePath = './';
    karma.start(conf, done);
});

gulp.task('copy', function () {
    gulp.src('./src/notifier.js')
        .pipe(rename('lrNotifier.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('minify', function () {
    gulp.src('./src/notifier.js')
        .pipe(uglify())
        .pipe(rename('lrNotifier.min.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['karma-CI', 'copy', 'minify']);

