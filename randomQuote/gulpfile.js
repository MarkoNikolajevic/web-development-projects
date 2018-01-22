/*jshint esversion: 6 */

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const pump = require("pump");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");


// Compile scss files into css and minify it
gulp.task("sass", function() {
  return gulp.src("src/assets/style/sass/**/*.sass")
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: "last 15 versions"
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("dist/assets/style/css"))
    .pipe(browserSync.stream());
});

// Minify js files
gulp.task("minifyJs", function(cb) {
  pump([
    gulp.src("src/assets/js/*.js"),
    uglify(),
    rename({
      suffix: ".min"
    }),
    gulp.dest("dist/assets/js"),
    browserSync.stream()
  ], cb);
});

// Browser Sync
gulp.task("serve", ["sass", "minifyJs"], function() {
  browserSync.init({
    server: {
      index: "index.html"
    }
  });
  gulp.watch("src/assets/style/sass/**/*.sass", ["sass"]);
  gulp.watch("src/assets/js/*.js").on("change", browserSync.reload);
  gulp.watch("*.html").on("change", browserSync.reload);
});

// Default
gulp.task("default", ["serve"]);
