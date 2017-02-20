var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');


gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch('/styles.scss', ['sass'])
});

var path = {
    'resources': {
        'scss': './resources/scss',
        'js': './resources/js'
    },
    'public': {
        'css': './public/assets/css',
        'js': './public/assets/js'
    }
};

gulp.task('sass', function () {

    return gulp.src(path.resources.scss + '/styles.scss')
        .pipe(sass({
            onError: console.error.bind(console, 'SASS ERROR')
        }))
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.public.css))
        .pipe(browserSync.reload({
            stream: true
        }))
});



/* browserSync blade */

// task lancé si une modification est faite dans les fichiers scss des resources/assets/sass
gulp.task('watch', ['browserSync', 'sass', 'task-js'], function () {
    gulp.watch('styles.scss', ['sass']);
});

gulp.task('default', ['watch']);
