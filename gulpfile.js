var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var source = require('vinyl-source-stream');
var browser = require('browserify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');
var watchify = require('watchify');
var globby = require('vinyl-globby');
var config = {
    img: {
        src: ['./src/img/**/*.jpg', './src/img/**/*.png'],
        output: './public/images'
    },
    js: {
        src: './src/js/*.js',
        output: './public/javascripts'
    },
    css: {
        src: './src/scss/*.scss',
        output: './public/stylesheets'
    },
    ejs: {
        src: './src/app/*.ejs',
        output: './views'
    },
    watch: {
        js: './src/js/**/*.js',
        img: ['./src/img/**/*.jpg', './src/img/**/*.png'],
        css: './src/scss/**/*.scss',
        ejs: './src/app/*.ejs'
    }
};
// watch
gulp.task('watch', function() {
    //gulp.watch(config.watch.js, ['js']);
    gulp.watch(config.watch.img, ['img']);
    gulp.watch(config.watch.css, ['css']);
    gulp.watch(config.watch.ejs, ['ejs']);
});
// img
gulp.task('img', function() {
    return gulp.src(config.img.src)
        .pipe(gulp.dest(config.img.output));
});
// js
gulp.task('js', function() {
    globby([config.js.src], function(err, files) {
        files.forEach(function(item) {
            var customOpts = {
                entries: './src/js/' + item.relative,
                debug: true
            };
            var opts = assign({}, watchify.args, customOpts);
            var b = watchify(browser(opts));
            bundle();
            b.on('update', bundle); 
            b.on('log', gutil.log); 
            function bundle(){
                b.bundle()
                .on('error', gutil.log.bind(gutil, 'Browserify Error'))
                .pipe(source(item.relative))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true })) 
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(config.js.output));
            }
        });
    });
});
// ejs
gulp.task('ejs', function(){
    return gulp.src(config.ejs.src)
        .pipe(gulp.dest(config.ejs.output));
});
// css
gulp.task('css', function() {
    return gulp.src(config.css.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.css.output));
});
