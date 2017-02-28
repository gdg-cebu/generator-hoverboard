const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const paths = {
  javascripts: [
    'static/javascripts/**/*.js',
    '!static/javascripts/**/*.min.js'
  ],
  stylesheets: [
    'static/stylesheets/**/*.css',
    '!static/stylesheets/**/*.min.css'
  ]
};
const buildDirectory = 'static';


gulp.task('buildcss', _ => {
  return gulp.src(paths.stylesheets, { base: 'static' })
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(cleancss())
    .pipe(rename(path => path.extname = '.min.css'))
    .pipe(gulp.dest(buildDirectory));
});


gulp.task('buildjs', _ => {
  return gulp.src(paths.javascripts, { base: 'static' })
    .pipe(uglify())
    .pipe(rename(path => path.extname = '.min.js'))
    .pipe(gulp.dest(buildDirectory));
});


gulp.task('build', ['buildcss', 'buildjs']);


gulp.task('watch', _ => {
  gulp.watch(paths.stylesheets, ['buildcss']);
  gulp.watch(paths.javascripts, ['buildjs']);
});


gulp.task('default', ['build', 'watch']);
