// 编写任务  整理数据，文件
const gulp = require("gulp");

// 拷贝html
// 压缩html
const htmlmin = require('gulp-htmlmin');
gulp.task("copy-html", function () {
    return gulp.src("*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})

// 拷贝图片
gulp.task("copy-img", function () {
    return gulp.src("*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

// 拷贝数据
gulp.task("copy-data", function () {
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

// 拷贝js代码

gulp.task("copy-scripts", function () {
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

// 处理scss代码  gulp-scss gulp-minify gulp-rename

const scss = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');


// 压缩、重命名要一个一个文件的写
gulp.task("scss1", function () {
    return gulp.src("index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("scss2", function () {
    return gulp.src("shopcar.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("shopcar.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

// 编写一个执行上述所有文件的任务
gulp.task("build", ["copy-html", "copy-img", "copy-scripts","copy-data", "scss1", "scss2"], function () {
    console.log("项目建立成功");
})

// 启动监听
gulp.task("watch", function () {
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("*.{jpg,png}", ["copy-img"]);
    gulp.watch(["*.json", "!package.json"], ["copy-data"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["copy-scripts"]);
    gulp.watch("index.scss", ["scss1"]);
    gulp.watch("shopcar.scss", ["scss2"]);
})

// 启动一个临时服务器  不支持运行php
const connect = require("gulp-connect");
gulp.task("server", function () {
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true  // 每一个任务后面都要加上.pipe(connect.reload());
    })
})

// 同时启动服务和监听
gulp.task("default", ["watch", "server"]);

