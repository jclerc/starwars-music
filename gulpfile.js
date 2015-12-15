//require each gulp plugins
var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync').create(),
    imagemin     = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel'),
    sourcemaps   = require('gulp-sourcemaps'),
    concat       = require('gulp-concat');
    plumber      = require('gulp-plumber');

// task script
gulp.task('script', function(){
    // source
    gulp.src([
        'src/js/libs/*.js',
        'src/js/app/*.js',
        'src/js/main.js',
    ])
    // actions
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        // create a *.js.map
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('.'))
    //destination
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
});
// //live reload it
// gulp.task('script-watch', ['script'], browserSync.reload);

//task style (sass, autoprefixer...)
gulp.task('style', function(){
    gulp.src('src/sass/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle : 'compressed'}))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

// image compressor
gulp.task('image', function(){
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img/'));
});

// html
gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});


//watches changes and trigger an action
gulp.task('watch', function(){
    browserSync.init({
        server : {
            //where is the index.html?
            baseDir : 'build/'
        }
    });
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/img/**/*', ['image']);
    gulp.watch('src/js/**/*.js', ['script']);
    // might want to change to scss
    gulp.watch('src/sass/**/*', ['style']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

//trigger by default each time you run gulp an array of tasks
//order sensitive?
gulp.task('default', ['script', 'style', 'image', 'html', 'watch']);