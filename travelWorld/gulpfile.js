const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

// Optimize images
gulp.task("optimizeImg", function() {
  gulp.src("assets/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/img"));
});

// Compile scss files into css and use browser-sync
gulp.task("sass", function() {
  return gulp.src("assets/style/sass/**/*.sass")
    .pipe(sass())
    .pipe(gulp.dest("dist/assets/style/"))
    .pipe(autoprefixer({
      browsers: "last 15 versions"
    }))
    .pipe(browserSync.stream());
});

// Browser Sync
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: {
      index: "index.html"
    }
  });
  gulp.watch("assets/style/sass/**/*.sass", ["sass"]);
  gulp.watch("*.html").on("change", browserSync.reload);
});

// Default
gulp.task("default", ["serve"]);
