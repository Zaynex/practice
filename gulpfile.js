var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watchPath = require('gulp-watch-path');
//找到报错的准确位置
var combiner = require('stream-combiner2');
//在控制台中按格式显示
var sourcemaps = require("gulp-sourcemaps");
var cleanCSS = require('gulp-clean-css');
//完善css规则
var autoprefixer = require('gulp-autoprefixer');

var imagemin = require('gulp-imagemin');

var handleError = function(err){
	var colors = gutil.colors;
	console.log("\n");
	gutil.log(colors.red("Error!"));
	gutil.log('fileName: ' + colors.red(err.fileName));
	gutil.log('lineNumber: '+ colors.red(err.lineNumber));
	gutil.log('message: ' + err.message );
	gutil.log('plugin: ' + colors.yellow(err.plugin));
};
//配置颜色
gulp.task('default', function () {
    gutil.log('message');
    gutil.log(gutil.colors.red('error'));
    gutil.log(gutil.colors.green('message:') + "some");
});

//再设定一个默认事件，用于监听源文件的改变
gulp.task('watchjs', function(){
	gulp.watch('h5/js/**/*.js', function(event){
		
		var paths = watchPath(event, 'h5/', 'h5build/');
		//srcPath指的是源文件， distPath指的是压缩文件
		gutil.log(gutil.colors.green(event.type) + " " + paths.srcPath);
		gutil.log('h5build ' + paths.distPath);

		// 将整个处理过程包起来，如果出现错误触发error事件
		// var combined = combiner.obj([
		// 	gulp.src(paths.srcPath)
		// 		.pipe(uglify())
		// 		.pipe(gulp.dest(paths.distDir))
		// ]);

		//
		var combined = combiner.obj([
			gulp.src(paths.srcPath),
			sourcemaps.init(),
			uglify(),
			sourcemaps.write('./'),
			gulp.dest(paths.distDir)
			]);

		combined.on('error', handleError);
	});
});

//如果只需要一次性编译文件，这样就可以了
// gulp.task('uglifyjs', function () {
//     var combined = combiner.obj([
//         gulp.src('h5/js/**/*.js'),
//         sourcemaps.init(),
//         uglify(),
//         sourcemaps.write('./'),
//         gulp.dest('h5build/js/')
//     ])
//     combined.on('error', handleError)
// })


//----编译css-----//
gulp.task('watchcss', function(){
	gulp.watch('h5/css/**/*.css', function(event){
		var paths = watchPath(event, 'h5/', 'h5build/');
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('h5build ' + paths.distPath);

        gulp.src(paths.srcPath)
        	.pipe(sourcemaps.init())
        	.pipe(autoprefixer({
        		broswers: "last 2 versions"
        	}))
        	.pipe(cleanCSS())
        	.pipe(sourcemaps.write("./"))
        	.pipe(gulp.dest(paths.distDir))
	});
});
//------一次性编译css----//
// gulp.task('minifycss', function () {
//     gulp.src('h5/css/**/*.css')
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({
//           browsers: 'last 2 versions'
//         }))
//         .pipe(cleanCSS())
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('h5build/css/'))
// })

gulp.task('watchimage', function(){
	gulp.watch('h5/imgs/**/*', function(event){
		var paths = watchPath(event, 'h5/', 'h5build/');

		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('h5build ' + paths.distPath);

        gulp.src(paths.srcPath)
        	.pipe(imagemin({
        		progressvie: true
        	}))
        	.pipe(gulp.dest(paths.distDir));
	});
});

//----一次性编译iamage----//
// gulp.task('image', function () {
//     gulp.src('h5/imgs/**/*')
//         .pipe(imagemin({
//             progressive: true
//         }))
//         .pipe(gulp.dest('h5build/imgs'))
// })
gulp.task('default', ['watchjs','watchcss','watchimage']);
