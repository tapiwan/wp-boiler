var gulp = require('gulp'),
	path = require('path'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	po2mo = require('gulp-gettext'),
	sassGraph = require('sass-graph'),
	concat = require('gulp-concat');

var assets = require('./assets.json');

var toWatch = [];
var toRun = [];

var buildScss = function(bundle) {
	return gulp.src(bundle.file)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass())
		.pipe(rename({
			basename: path.basename(bundle.name, path.extname(bundle.name))
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest(path.dirname(bundle.name)));
};

var buildJs = function(bundle) {
	return gulp.src(bundle.includes)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat(path.basename(bundle.name)))
		.pipe(jshint())
		.pipe(uglify({
			mangle: bundle.mangle
		}))
		.pipe(gulp.dest(path.dirname(bundle.name)));
};

var buildPo = function(file) {
	var fileName = path.basename(file, path.extname(file));

	return gulp.src(file)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(po2mo())
		.pipe(gulp.dest(path.dirname(file)))
};

var readScssBundles = function() {
	assets.scss.bundles.forEach(function(bundle) {
		var taskName = 'build:scss:' + bundle.name;

		gulp.task(taskName, function() {
			return buildScss(bundle);
		});

		var importedFiles = Object.keys(sassGraph.parseFile(bundle.file).index);

		toWatch.push({
			files: importedFiles,
			task: taskName
		});

		toRun.push(taskName);
	});
};

var readJsBundles = function() {
	assets.js.bundles.forEach(function(bundle) {
		var taskName = 'build:js:' + bundle.name;

		gulp.task(taskName, function() {
			return buildJs(bundle);
		});

		toWatch.push({
			files: bundle.includes,
			task: taskName
		});

		toRun.push(taskName);
	});
};

var readTranslationFiles = function() {
	assets.translations.files.forEach(function(file) {
		var taskName = 'build:translation:' + file;

		gulp.task(taskName, function() {
			return buildPo(file);
		});

		toWatch.push({
			files: file,
			task: taskName
		});

		toRun.push(taskName);
	});
};

gulp.task('watch', function() {
	readScssBundles();
	readJsBundles();
	readTranslationFiles();

	toRun.forEach(function(taskName) {
		gulp.start(taskName);
	});

	toWatch.forEach(function(watchable) {
		gulp.watch(watchable.files, [watchable.task]);
	});
});

gulp.task('default', ['watch']);
