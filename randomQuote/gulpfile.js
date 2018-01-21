/*jshint esversion: 6 */

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
