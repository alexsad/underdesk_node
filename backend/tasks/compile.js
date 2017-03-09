var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var tsConfig = require("../tsconfig.json").compilerOptions;

function compile_ts(path){
    return gulp.src([
            path
            //,"./jspm_packages/npm/event-emitter-lite@*/*.d.ts"
        ])
        .pipe(ts(tsConfig))
        //.pipe(uglify())
        .pipe(gulp.dest(tsConfig.outDir));
};

gulp.task('copy_interfaces',function(){
    return gulp.src([
        "../interfaces/*.ts"
    ])
    .pipe(gulp.dest("src/interfaces"));
});

gulp.task('compile',['copy_interfaces'],function(){
    return  compile_ts("./src/**/*.ts");
});



module.exports = compile_ts;

