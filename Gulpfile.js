var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var react = require('gulp-react');

gulp.task('start',function(){
  nodemon({
    script: 'start.js',
    ext: 'js scss jsx',
    tasks:['styles', 'jsx']
  });

});


gulp.task('styles', function() {
  return sass('sass/',{style:'expanded'})
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(gulp.dest('public/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/css'));
});

gulp.task('jsx',function(){
  return gulp.src('public/jsx/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('public/js'));

});


gulp.task('default',['styles','jsx','start'],function(){

});
