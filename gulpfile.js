var gulp         = require('gulp');
var less         = require('gulp-less');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefix   = require('gulp-autoprefixer');
var minify       = require('gulp-minify-css');
var rename       = require('gulp-rename');
var header       = require('gulp-header');
var nunjucks     = require('gulp-nunjucks-render');
var pkgData      = require('./package.json');
var argv         = require('yargs').argv;
var baseUrlFlag  = (argv.production) ? pkgData.demo.url : '';
var banner       = ['/** <%= package.name %> | <%= package.demo.url %> */\n'];
var fs           = require('fs');
var lessPaths    = fs.readdirSync('./src/less');
var lessData     = {};

lessPaths.forEach(function(fileName) {
  fs.readFile('./src/less/' + fileName, 'utf8', function (error, fileContent) {
    if (error) { throw error; }
    var fileBaseName = fileName.slice(0, -5);
    lessData[fileBaseName] = fileContent;
  })
});

gulp.task('css', function() {
  return gulp.src('src/less/bundle.less')
    .pipe(less())
    .pipe(autoprefix())
    .pipe(rename(pkgData.keyword + '.css'))
    .pipe(header(banner, { package: pkgData }))
    .pipe(gulp.dest('dist')) // <-- deliver expanded for dist
    .pipe(minify())
    .pipe(rename(pkgData.keyword + '.min.css'))
    .pipe(header(banner, { package: pkgData }))
    .pipe(gulp.dest('dist')) // <-- deliver compressed for dist
    .pipe(gulp.dest('docs')) // <-- deliver extra copy for docs
})

gulp.task('html', function() {
  return gulp.src('src/docs/pages/**/*.njk')
    .pipe(nunjucks({
      path: 'src/docs/partials',
      data: { package: pkgData, baseURL: baseUrlFlag, less: lessData }
    }))
    .pipe(gulp.dest('docs'));
})

gulp.task('default', ['css', 'html'], function() {
  gulp.watch('src/less/*', ['css', 'html']),
  gulp.watch('src/docs/**/*', ['html'])
})
