// This ensures variables are declared
// before they can be used.
'use strict';

// Set variables for all node tools.
var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps');

// Creates standard paths for asset locations.
var paths = {
  css: {
    src: 'src/scss/*.scss',
    dest: 'dist/css'
  }
};

// Processes SCSS/CSS by adding sourcemaps, autoprefixer, and
// minifying.
function styles() {
  return gulp
    .src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dest));
}

// Creates a watch task and reloads page with browserSync.
function watch() {

  // BrowserSync reloads whenever css, javascript or html files are saved.
  gulp.watch(paths.css.src, styles);
}


// Exports tasks so they can be ran from CLI.
exports.watch = watch;
exports.css = styles;

// Sets tasks to run in parallel.
var build = gulp.parallel(styles, watch);

// Creates default task.
gulp.task('default', build);
