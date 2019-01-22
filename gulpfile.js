var gulp         = require('gulp');
var postcss      = require('gulp-postcss');
var nextcss      = require('postcss-preset-env');
var atImport     = require('postcss-import');
var autoprefix   = require('gulp-autoprefixer');
var minify       = require('gulp-minify-css');
var rename       = require('gulp-rename');
var header       = require('gulp-header');
var nunjucks     = require('gulp-nunjucks-render');
var pkgJson      = require('./package.json');
var browserSync  = require('browser-sync').create();
var banner       = ['/** <%= package.repo.url %> */\n\n'];
var fs           = require('fs');

gulp.task('css', function() {
  return gulp.src('./src/css/bundle.css')
    .pipe(postcss([nextcss,atImport]))
    .pipe(autoprefix())
    .pipe(rename(pkgJson.keyword + '.css'))
    .pipe(header(banner, { package: pkgJson }))
    .pipe(gulp.dest('./dist')) // <-- deliver expanded for dist
    .pipe(minify())
    .pipe(rename(pkgJson.keyword + '.min.css'))
    .pipe(header(banner, { package: pkgJson }))
    .pipe(gulp.dest('./dist')) // <-- deliver compressed for dist
    .pipe(gulp.dest('./docs')) // <-- deliver extra copy for docs
    .pipe(browserSync.stream())
})

gulp.task('html', function() {
  var cssData = {};
  fs.readdirSync('./src/css/').forEach(function(fileName) {
    var cssFileName = fileName.slice(0, -4);
    var cssContent = fs.readFileSync('./src/css/' + fileName);
    cssData[cssFileName] = cssContent;
  });
  return gulp.src('./src/docs/pages/**/*.njk')
    .pipe(nunjucks({
      path: './src/docs/partials',
      data: { package: pkgJson, cssFiles: cssData }
    }))
    .pipe(gulp.dest('./docs'))
    .pipe(browserSync.stream())
})

gulp.task('readme', function() {
  return gulp.src('./src/readme/*.njk')
    .pipe(nunjucks({
      ext: '.md',
      data: { package: pkgJson }
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('server', function() {
  browserSync.init({ server: "./docs", open: false })
})

gulp.task('watch', function() {
  gulp.watch('./src/css/**/*', ['css','html']);
  gulp.watch('./src/docs/**/*', ['html']);
  gulp.watch('./src/readme/**/*', ['readme']);
})

gulp.task('default', ['css', 'html', 'readme', 'server', 'watch'])
