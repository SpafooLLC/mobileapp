//gulpconfig path

var clientRoot = './';
var sourcePath = clientRoot + 'source/';
var sourcePathApp = sourcePath + 'app/';
var sourcePathScss = sourcePath + 'scss/';
var sourcePathImages = sourcePath + 'images/';
var sourcePathFonts = sourcePath + 'fonts/';
var sourcePathStyles = sourcePath + 'styles/';
var sourcePathJs = sourcePath + 'js/';
var sourcePathLess = sourcePath + 'less/';
var sourcePathTemplate = sourcePathApp + 'templates/';
// Build
var buildPath = clientRoot + 'www/';
var buildPathApp = buildPath + 'app/';
var buildPathImages = buildPath + 'images/';
var buildPathFonts = buildPath + 'fonts/';
var buildPathStyles = buildPath + 'styles/';
var buildPathJs = buildPath + 'js/';
var buidPathTemplate = buildPathApp + 'templates/';
var buildPathExternalJs = buildPath + 'bowercomponents/';

// Goodies
var allStylesCss = sourcePath + '**/*.css';
var allTypeScript = sourcePathApp + '**/*.ts';
//var allHtml = sourcePath + '**/*.html';
var allImages = sourcePathImages + 'images/**/*';
var htmlTemplates = sourcePathTemplate + '**/*.html';
var allScss = sourcePathScss + '**/*.scss';
var allLess = sourcePathLess + '**/*.less';
//var ionicFonts = externalJavaScript + '/ionic/fonts/*.*';

/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var less = require('gulp-less');
var paths = {
    sass: ['./scss/**/*.scss'],
    tsc: ['./source/**/*.ts']
};
var clean = require('rimraf');
inject = require('gulp-inject'),
  mainBowerFiles = require('gulp-main-bower-files');

gulp.task('serve:before', ['watch']);

gulp.task('default', ['watch']);
gulp.task('build-dev', function (done) {
    runSequence = require('run-sequence');
    return runSequence(
        //'clean-build-folder',
        //'templateCache',
        //'copy-styles',
        'copy-fonts',
        //'copy-ionic-fonts',
        'copy-images',
        //'copy-locales',
        'copy-index',
        'copy-js',
       'copy-styles',
        'copy-html',
        //'clean-external-js',
        //'clean-external-js-maps',
        //'clean-internal-js',
        //'clean-internal-js-maps',
        'wire-external-js',
     
        'inject-js-css-dev',
       
        //'copy-external-js',
        //'inject-env-conf',
        done
    );
});
gulp.task('copy-html', ['clean-html'], function () {
    return gulp.src(sourcePathTemplate + '/**/*.html').pipe(gulp.dest(buidPathTemplate))
});
gulp.task('copy-styles', function () {
    return gulp.src(sourcePathStyles + '/**/*.css')
        .pipe(gulp.dest(buildPathStyles));
});
gulp.task('clean-html', function (done) {
    clean(buidPathTemplate, done);
});
gulp.task('clean-fonts', function (done) {
  
    clean(buildPathFonts, done);
});

//gulp.task('clean-styles', function (done) {
//    clean(config.buildPathAssetsStyle, done);
//});

//gulp.task('copy-fonts', ['clean-fonts'], function () {
//    return gulp.src(sourcePathFonts)
//        .pipe(gulp.dest(buildPathFonts + '**/*.woff2'));
//});
gulp.task('copy-fonts', ['clean-fonts'], function () {
    return gulp.src(sourcePath + '/**/*.{woff2,otf,eot,svg,ttf,woff}')
        .pipe(gulp.dest(buildPath));
});

gulp.task('copy-styles', function () {
    return gulp.src(sourcePathStyles + '/**/*.css')
        .pipe(gulp.dest(buildPathStyles));
});
//sourcePathAssetsStyles
//gulp.task('copy-ionic-fonts', function () {
//    log(config.ionicFonts);
//    log(config.buildPathAssetsFonts);

//    return gulp.src(config.ionicFonts)
//        .pipe(gulp.dest(config.buildPathAssetsFonts));
//});

/**
 * Images Helper
 */
gulp.task('clean-images', function (done) {
    clean(buildPathImages, done);
});

gulp.task('copy-images', ['clean-images'], function () {
    return gulp.src(sourcePathImages + '**/*.{jpg,png,gif,svg}')
        .pipe(gulp.dest(buildPathImages));
});

/**
 * Locales helper
 */

//gulp.task('copy-locales', [], function () {
//    return gulp.src(config.sourcePathLocales + '**/*.json')
//        .pipe(gulp.dest(config.buildPathLocales));
//});

/**
 * Index.html Helpers
 */
gulp.task('copy-index', function () {
    return gulp.src(sourcePath + 'index.html')
        .pipe(gulp.dest(buildPath));
});

/**
 * js helpers
 */
gulp.task('copy-js', function () {
    return gulp.src(sourcePathJs + '/**/*.js')
        .pipe(gulp.dest(buildPathJs));
});
gulp.task('copy-external-js', function () {
    return gulp

        .src('./bower.json').pipe(mainBowerFiles())
        .pipe(gulp.dest(buildPathExternalJs));
});
gulp.task('wire-external-js', ['copy-external-js'], function () {
    var wiredep = require('wiredep').stream;

    var wiredepConfig = {
        bowerJson: require('./bower.json'),   // defaults to ./bower.json
        directory: './bowercomponents', // defaults to '.bowerrc'.directory
        ignorePath: '../../bowercomponents/',
        exclude: [],
        fileTypes: {
            html: {
                replace: {
                    css: function (filePath) {
                        console.log('hello'+filePath);
                        filePath = filePath.replace('../bowercomponents/', '');
                        return '<link rel="stylesheet" href="bowercomponents/' + filePath + '" />';
                    },
                    js: function (filePath) {
                        filePath = filePath.replace('../bowercomponents/', '');
                        return '<script src="bowercomponents/' + filePath + '"></script>';
                    }
                   
                }
            }
        }
    };

    return gulp.src(buildPath + 'index.html')
        .pipe(wiredep(wiredepConfig))
        .pipe(gulp.dest(buildPath));
});
/**
 * Inject CSS into index.html
 */
gulp.task('inject-js-css-dev', ['tsc', 'sass'], function () {
    var source = gulp.src([
        buildPath + 'styles/' + 'style.css',
//buildPath +  'bowercomponents/**/ionic.css',
     buildPath + 'styles/' + 'bootstrap.css',
        '!' + buildPath + 'styles/' + '**/*.min.css',
        buildPath  + '**/*.js',
        '!' + buildPath + '**/*.min.js',
        '!' + buildPath + 'bowercomponents/**/*.js',
  '!' + buildPath + 'js/**/*.js',
      
    ], { read: false });

    return gulp
        .src(buildPath + 'index.html')
        .pipe(inject(source, {
            
            transform: function (filepath) {
                filepath = filepath.replace('/www/', '');
                if (filepath.slice(-3) === 'css') {
                    return '<link rel="stylesheet" href="' + filepath + '">';
                } else {
                    return '<script src="' + filepath + '"></script>';
                }
            }
        }))
        .pipe(gulp.dest(buildPath));
});
gulp.task('gen-ts-refs', function () {
    var target = gulp.src('./typings/index.d.ts');
    var sources = gulp.src([allTypeScript], { read: false });
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest('./typings'));
});
gulp.task('sass', function (done) {
    gulp.src(allScss)
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(gulp.dest(buildPathStyles))
      .pipe(minifyCss({
          keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(buildPathStyles))
      .on('end', done);
});
//gulp.task('less', function (done) {
//    gulp.src(allLess)
//      .pipe(less())
     
//      .pipe(gulp.dest(buildPathStyles))
//      .pipe(minifyCss({
//          keepSpecialComments: 0
//      }))
//      .pipe(rename({ extname: '.min.css' }))
//      .pipe(gulp.dest(buildPathStyles))
    
//});


// Run gulp watch in conjunction with Ionic serve to 
// reflect live changes to TypeScript files in app directory
gulp.task('watch',['build-dev'], function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.tsc, ['tsc']);
    
});

// Run gulp tsc to transpile your TypeScript files from
// app directory to www/js directory
//gulp.task('tsc', function () {
//    var sourcemaps = require("gulp-sourcemaps");
//    var ts = require('gulp-typescript');
//    //var tsProject = ts.createProject('tsconfig.json');
//    var tsProject = allTypeScript;
   
//    var tsResult= gulp
//        .src(tsProject)
//        .pipe(sourcemaps.init())
//        .pipe(ts({
//            "target": "es5",
//            declarationFiles: false,
//            noExternalResolve: true,

//        }));
//    console.log(buildPathApp);
//    tsResult.pipe(gulp.dest(buildPathApp));

//       return tsResult.js
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest(buildPathApp));
//});
gulp.task('tsc', ['gen-ts-refs'], function () {
    var sourcemaps = require("gulp-sourcemaps");
    var ts = require('gulp-typescript');
    var tsProject = ts.createProject('tsconfig.json');
    var typeScriptPath = allTypeScript;
    return tsProject
        .src(typeScriptPath)
        .pipe(sourcemaps.init())
        .pipe(ts({
            target: "es5",
            declarationFiles: false,
            noExternalResolve:true


        }))
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildPathApp));
});