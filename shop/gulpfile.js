const gulp = require("gulp");
const gulpconcat = require("gulp-concat");
//html
const gulphtmlmin = require("gulp-htmlmin");
//css
const gulpsass = require("gulp-sass");
const gulpautoprefixer = require("gulp-autoprefixer");
const gulpcleancss = require("gulp-clean-css");
//js
const gulpbabel = require("gulp-babel");
const gulpuglify = require("gulp-uglify");
const babelcore = require("babel-core");
//webserver
const gulpwebserver = require("gulp-webserver");


gulp.task("index", function () {
    //执行不包含home.html所有的html文件
    return gulp.src(["./src/index.html"])
        .pipe(gulphtmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest("./bind"))
})

//压缩 HTML文件并打包
gulp.task("html", function () {
    //执行不包含home.html所有的html文件
    return gulp.src(["./src/html/*.html","!./src/html/index.html"])
        .pipe(gulphtmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest("./bind/html"))
})

//压缩 scss文件并转义打包
gulp.task("scss", function () {
    return gulp.src(["./src/scss/*.scss", "!./src/scss/common.scss"])
        .pipe(gulpautoprefixer({ //这是最低版本
            browsers: ["last 2 versions"],
            cascade: false
        })) //版本号
        .pipe(gulpsass()) //转义sass
        .pipe(gulpcleancss()) //压缩css
        .pipe(gulp.dest("./bind/css"))
})

//压缩 js文件并转义打包
gulp.task("js", function () {
    return gulp.src("./src/js/*.js")
        .pipe(gulpbabel({ //es6 转义es5
            presets: "es2015"
        }))
        .pipe(gulpuglify()) //压缩js
        .pipe(gulp.dest("./bind/js"))
})

//监听工作区实时更新
gulp.task("watch", function () {
    //gulp.series 同步执行  按添加顺序依次执行
    gulp.watch("./src/html/*.html", gulp.series("html"))
    gulp.watch("./src/index.html", gulp.series("index"))
    gulp.watch("./src/scss/*.scss", gulp.series("scss"))
    gulp.watch("./src/js/*.js", gulp.series("js"))
})

gulp.task("server", function () {
    return gulp.src("./bind") //目标地址
        .pipe(gulpwebserver({
            port: 9090, //端口号
            open:true,
            host: "192.168.137.44", //修改书写服务器  对外开放使用本机IP  对内可省略不写或localhost
            proxies: [{
                    source: "/api/shoplist",
                    target: "http://192.168.137.44:3000/shoplist"
                },
               
            ] 
        }))
})


//gulp.parallel 异步执行
gulp.task("default", gulp.parallel("html","js","scss","index","server", "watch"))