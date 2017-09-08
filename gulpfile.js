var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
    po2mo = require('gulp-gettext'),
	include = require('gulp-include');

//###################
//# INPUT AND OUTPUT
//###################
var scss = {
	srcDirectory: 'src/scss',
	srcFileWithExtension: 'styles.scss',
	outputDirectory: 'styles',
	outputFileName: 'styles',
	minificationSuffix: '.min'
};

var js = {
	srcDirectory: 'src/js',
	srcFileWithExtension: 'main.js',
	outputDirectory: 'scripts',
	outputFileName: 'main',
	mangleOutput: true,
	minificationSuffix: '.min'
};

var lang = {
	srcDirectory: 'languages',
	outputDirectory: 'languages'
};

//###################
//# BUILD
//###################
gulp.task('build', ['build:scss', 'build:js']);

//###################
//# WATCH
//###################
gulp.task('watch', function() {
	gulp.watch(scss.srcDirectory + '/**/*.scss', ['build:scss']);
	gulp.watch(js.srcDirectory + '/**/*.js', ['build:js']);
	gulp.watch(lang.srcDirectory + '/**/*.po', ['build:po']);
});

//###################
//# BUILD:SCSS
//###################
gulp.task('build:scss', function() {
	return gulp.src('./' + scss.srcDirectory + '/' + scss.srcFileWithExtension)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass())
		.pipe(rename({
			basename: scss.outputFileName
		}))
		.pipe(gulp.dest('./' + scss.outputDirectory))
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: scss.minificationSuffix
		}))
		.pipe(gulp.dest('./' + scss.outputDirectory))
		.pipe(notify("Success! <%= file.relative %>"));
});

//###################
//# BUILD:JS
//###################
gulp.task('build:js', function() {
	return gulp.src('./' + js.srcDirectory + '/' + js.srcFileWithExtension)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(include({
			extensions: "js"
		}))
		.pipe(jshint())
        .pipe(rename({
            basename: js.outputFileName
        }))
        .pipe(gulp.dest('./' + js.outputDirectory))
		.pipe(uglify({
			mangle: js.mangleOutput
		}))
		.pipe(rename({
			suffix: js.minificationSuffix
		}))
		.pipe(gulp.dest('./' + js.outputDirectory))
		.pipe(notify("Success! <%= file.relative %>"));
});

//###################
//# BUILD:PO
//###################
gulp.task('build:po', function () {
    return gulp.src('./'+ lang.srcDirectory +'/**/*.po')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(po2mo())
        .pipe(gulp.dest('./' + lang.outputDirectory));
});