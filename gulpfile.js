const gulp = require('gulp');

const $gp = require('gulp-load-plugins')();

const browserSync = require('browser-sync').create();
const moduleImporter = require('sass-module-importer');
const del = require('del');
const cssunit = require('gulp-css-unit');

const paths = {
  root: './public',
  assets: {
    src: 'src/assets/**/*.*',
    dest: 'public/assets'
  },
  templates: {
    src: 'src/*.html',
    dest: 'public/'
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'public/css/'
  },
  images: {
    src: 'src/images/**/*.*',
    dest: 'public/images/'
  },
  fonts: {
    src: 'src/fonts/**/*.*',
    dest: 'public/fonts/'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'public/js/'
  }
};

function templates() {
  return gulp.src(paths.templates.src)
    .pipe(gulp.dest(paths.templates.dest));
}

function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

function styles() {
  return gulp.src('src/scss/style.scss')
    /* .pipe($gp.sourcemaps.init()) */
    .pipe($gp.sass({
      importer: moduleImporter()
    }))
    /* .pipe($gp.autoprefixer({
      cascade: false
    })) */
    /* .pipe(cssunit({
      type: 'px-to-rem',
      rootSize: 16
    })) */
    /* .pipe($gp.sourcemaps.write()) */
    // .pipe($gp.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest));
}

function clean() {
  return del(paths.root);
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.fonts.src, fonts);
}

function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

function assets() {
  return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;

gulp.task('default',
  gulp.series(clean,
    gulp.parallel(assets, fonts, templates, styles, images, scripts),
    gulp.parallel(watch, server)
  ));
