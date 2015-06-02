/**
 * Created by jmccommas on 6/2/15.
 */
// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var usemin = require('gulp-usemin');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});
// bower components
gulp.task('usemin', function () {
    return gulp.src('./*.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            html: [minifyHtml({empty: true})],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [minifyCss(), 'concat']
        }))
        .pipe(gulp.dest('build/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/js/*.js', ['lint', 'scripts']);
    gulp.watch('app/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);