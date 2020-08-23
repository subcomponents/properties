var { gulp, src, dest, watch, series, parallel } = require('gulp');
var postcss      = require('gulp-postcss');
var presetEnv    = require('postcss-preset-env');
var atImport     = require('postcss-import');
var minify       = require('gulp-minify-css');
var rename       = require('gulp-rename');
var header       = require('gulp-header');
var easingGradients = require('postcss-easing-gradients');
var nunjucks     = require('gulp-nunjucks-render');
var pkgJson      = require('./package.json');
var browserSync  = require('browser-sync').create();
var banner       = ['/** <%= package.version %> <%= package.repo.url %> */\n'];
var fs           = require('fs');

function css() {
  return src('./src/css/bundle.css')
    .pipe(postcss([atImport, easingGradients, presetEnv({preserve: true})]))
    .pipe(rename(pkgJson.keyword + '.css'))
    .pipe(header(banner, { package: pkgJson }))
    .pipe(dest('./dist')) // <-- deliver expanded for dist
    .pipe(minify())
    .pipe(rename(pkgJson.keyword + '.min.css'))
    .pipe(header(banner, { package: pkgJson }))
    .pipe(dest('./dist')) // <-- deliver compressed for dist
    .pipe(dest('./docs')) // <-- deliver extra copy for docs
    .pipe(browserSync.stream())
}

function html() {
  var cssData = {};
  fs.readdirSync('./src/css/').forEach(function(fileName) {
    var cssFileName = fileName.slice(0, -4);
    var cssContent = fs.readFileSync('./src/css/' + fileName);
    cssData[cssFileName] = cssContent;
  });
  return src('./src/docs/pages/**/*.njk')
    .pipe(nunjucks({
      path: './src/docs/partials',
      data: { package: pkgJson, cssFiles: cssData }
    }))
    .pipe(dest('./docs'))
    .pipe(browserSync.stream())
}

function readme() {
  return src('./src/readme/*.njk')
    .pipe(nunjucks({
      ext: '.md',
      data: { package: pkgJson }
    }))
    .pipe(dest('./'))
}

function server() {
  browserSync.init({ server: "./docs", open: false })
}

function watcher() {
  watch('./src/css/**/*', series(css, html));
  watch('./src/docs/**/*', html);
  watch('./src/readme/**/*', readme);
}

exports.default = parallel(css, html, readme, server, watcher);
