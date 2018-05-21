// Include gulp 
const gulp = require('gulp')

// Include plugins
const browsersync = require('browser-sync')
const runSequence = require('run-sequence')
const del = require('del');
const changed = require('gulp-changed')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')

const paths = {
	src: 'src/**/*',
	dist: 'dist/',
	html: 'src/**/*.html',
	jsSrc: 'src/js/**/*.js',
	jsSrcVendor: 'src/js/vendor/**/*.js',
	scss: 'src/scss/**/{*.scss,_*.scss}',
	css: 'dist/css',
	jsDist: 'dist/scripts',
	jsDistVendor: 'dist/scripts/vendor',
}

gulp.task('build', (callback) => {
	runSequence('clean',
	[
		'html',
		'css',
		'js',
		'js:vendor',
		'image:copy',
		'fonts:copy'
	],
	callback)
})

gulp.task('clean', () => {
	return del(paths.dist)
})

gulp.task('html', () => {
	return gulp.src(paths.html)
		.pipe(changed(paths.dist))
		.pipe(gulp.dest(paths.dist))
})

gulp.task('css', () => {
	return gulp.src(paths.scss)
		.pipe(changed(paths.css))
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: ['node_modules']
		  }).on('error', sass.logError))
		.pipe(concat('style.min.css'))
		.pipe(postcss([
			autoprefixer({browsers: ['last 2 versions', "safari >= 7"]}),
			cssnano()
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.css))
})

gulp.task('js', () => {
	return gulp.src(['!src/js/vendor/**/*.js', '!node_modules/**', paths.jsSrc])
		.pipe(eslint())
		.pipe(eslint.result(result => {
			console.log(`ESLint result: ${result.filePath}`);
			console.log(`# Messages: ${result.messages.length}`);
			console.log(`# Warnings: ${result.warningCount}`);
			console.log(`# Errors: ${result.errorCount}`);
		}))
		.pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
		}))
		.pipe(concat('site.min.js'))
		.pipe(uglify())
			.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.jsDist))
})

gulp.task('js:vendor', () => {
	return gulp.src([
		'node_modules/',
		paths.jsSrcVendor
	])
	.pipe(changed(paths.jsDist))
	.pipe(sourcemaps.init())
	//.pipe(babel()
	.pipe(concat('vendor.min.js'))
	//.pipe(uglify())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.jsDist))
})

gulp.task('image:copy', () => {
	return gulp.src('src/images/**/*.{png,jpeg,jpg,gif,svg}')
		.pipe(gulp.dest(`${paths.dist}images`))
})

gulp.task('fonts:copy', () => {
	return gulp.src('src/fonts/**/*.{eot,otf,ttf,woff,woff2}')
		.pipe(gulp.dest(`${paths.dist}fonts`))
})

gulp.task('browsersync', ['build'], () => {
	browsersync({
		server: { baseDir: [paths.dist] },
		port: 9999,
		files: [
			'dist/**/*.{html,htm,xml,json,txt}',
			'dist/css/*.css',
			'dist/js/**/*.js',
			'dist/**/*.{png,jpeg,jpg,gif,svg,ico}',
			'dist/fonts/**/*.{eot,otf,ttf,woff,woff2}'
		]
	})
})

gulp.task('watch', ['browsersync'], () => {
	gulp.watch(paths.jsSrc, ['js'])
	gulp.watch(paths.jsSrcVendor, ['js:vendor'])
	gulp.watch(paths.scss, ['css'])
	gulp.watch(paths.html, ['html'])
	gulp.watch('src/images/**/*.{png,jpeg,jpg,gif,svg}', ['image:copy'])
	gulp.watch('src/fonts/**/*.{eot,otf,ttf,woff,woff2}', ['fonts:copy'])
})

gulp.task('default', ['watch'])