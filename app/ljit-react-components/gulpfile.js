const gulp = require('gulp');
const clean = require('gulp-clean');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const productionConfig = require('./webpack.production.config.js');

const paths = {
	src: './src/index.js',
	build: './dest/',
};

gulp.task('clean', function () {
	return gulp.src(paths.build, { read: false, allowEmpty: true, })
		.pipe(clean());
});

gulp.task('build', function () {
	return gulp.src(paths.src, { allowEmpty: true, })
		.pipe(gulpWebpack(productionConfig), webpack)
		.pipe(gulp.dest(paths.build));
});

gulp.task('default', gulp.series('clean', 'build'));
