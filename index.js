var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var ngAnnotate = require('gulp-ng-annotate');
var html2js = require('gulp-html2js');
var jshint = require('gulp-jshint');
// var stylish = require('jshint-stylish');

var Task = Elixir.Task;
var $ = Elixir.Plugins;

Elixir.extend('angular', function (src, output, outputFilename) {
  var config = Elixir.config;
  var baseDir = src || config.assetsPath + '/angular';

  new Task('angular', function () {

    return gulp.src([
      baseDir + '/*.module.js',
      baseDir + '/**/*.module.js',
      baseDir + '/**/*.js'
    ])
    .pipe(jshint())
    // .pipe(jshint.reporter(stylish))
    // .pipe(jshint.reporter('fail'))
    .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
    .on('error', new Elixir.Notification('Angular compilation failed!'))
    .pipe($.concat(outputFilename || 'application.js'))
    .pipe(ngAnnotate())
    .pipe($.if(config.production, $.uglify()))
    .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
    .pipe(gulp.dest(output || config.get('public.js.outputFolder') + '/app/'))
    .pipe(new Elixir.Notification('Angular compiled!'));
  }).watch(baseDir + '/**/*.js');
});

Elixir.extend('angularViews', function (src, output, outputFilename) {
  var config = Elixir.config;
  var baseDir = src || config.assetsPath + '/views';

  new Task('angularViews', function () {
    return gulp.src([
      baseDir + '/**/*.html'
    ])
    .pipe(html2js(outputFilename || 'views.js', {
      adapter: 'angular',
      base: config.assetsPath,
      name: false
    }))
    .pipe(gulp.dest(output || config.get('public.js.outputFolder') + '/app/'))
    .pipe(new Elixir.Notification('Angular views compiled!'));;

  }).watch(baseDir + '/**/*.html');
});
