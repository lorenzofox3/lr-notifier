var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

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

gulp.task('default', ['copy', 'minify']);
