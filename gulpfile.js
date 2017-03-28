var gulp = require('gulp');
var del = require('del');

/**
 * clean-js: removes js and js mpas file
 */
gulp.task('clean-js', function () {
  return del([
    'lib/**/*.js',
    'lib/**/*.js.map',
    'server/index.js',
    'server/index.js.map',
    'server/lib/**/*.js',
    'server/lib/**/*.js.map'
  ]);
});

gulp.task('clean-dist', function() {
    return del(
        'dist/server/**/*'
    );
});

gulp.task('copy', function(){
   return gulp.src([
       'package.json',
       '*lib/**/*.js',
       '*server/**/*.js',
       '*client/index.html'
    ]).pipe(gulp.dest('dist/server/'));
});