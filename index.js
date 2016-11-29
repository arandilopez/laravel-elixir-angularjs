var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var ngAnnotate = require('gulp-ng-annotate');
var eslint = require('gulp-eslint');
var html2js = require('gulp-html2js');

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
    .pipe(eslint())
    .pipe(eslint.failAfterError()).on('error', new Elixir.Notification('Angular compilation failed!'))
    .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
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
      base: baseDir,
      name: false
    }))
    .pipe(gulp.dest(output || config.get('public.js.outputFolder') + '/app/'));

  }).watch(baseDir + '/**/*.html');
});
