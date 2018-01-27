/*jshint esversion: 6 */

const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const pump = require("pump");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");

// Optimize images
gulp.task("optimizeImg", () =>
  gulp.src("src/assets/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/img"))
);

// Compile sass and minify
gulp.task("sass", function() {
  return gulp.src("src/assets/style/sass/**/*.sass")
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: "last 5 versions"
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/assets/style/css"))
    .pipe(browserSync.stream());
});

// Minify js files
gulp.task("minifyJs", function(cb) {
  pump([
    gulp.src("src/assets/js/*.js"),
    sourcemaps.init(),
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
  gulp.watch("src/assets/js/*.js", ["minifyJs"]);
  gulp.watch("src/index.html").on("change", browserSync.reload);
});

// Default
gulp.task("default", ["serve"]);
