const gulp = require('gulp');

const sass = require('gulp-sass'); // convert sass to css
const cssnano = require('gulp-cssnano'); // it compresses the above
const rev = require('gulp-rev');// rename file with hash
const uglify = require('gulp-uglify-es').default; // minifying js
const imagemin = require('gulp-imagemin'); // mifinifying img
const del = require('del');

gulp.task('css', function(done){
    // console.log('minifying css...');
    // gulp.src('./assets/sass/**/*.scss')
    // .pipe(sass())
    // .pipe(cssnano())
    // .pipe(gulp.dest('./assets.css'));

     gulp.src('./assets/**/*.css')
    .pipe(cssnano())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});