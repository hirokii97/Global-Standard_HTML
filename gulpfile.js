//https://haniwaman.com/gulp-sass/#index_i

const gulp = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");//複数ブラウザに対応したCSSへの変換
const cssSorter = require("css-declaration-sorter");//プロパティをソートし直してくれる（アルファベット順等）
const mmq = require("gulp-merge-media-queries");//メディアクエリを1つにまとめてくれる
const browserSync = require("browser-sync");//ブラウザ表示
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");//高機能なJavaScript用の圧縮・最適化ツール
const htmlBeautify = require("gulp-html-beautify");

//pug
const pug =require('gulp-pug');

function test(done) {
  console.log("hello Gulp");
  done();
}

function compileSass() {
  return (
    gulp
      .src("./src/assets/sass/**/*.scss") //フォルダも含めたsrcファイル内全てのscssファイルをコンパイル
      //コンパイルの処理を記載する
      .pipe(sass())
      .pipe(postcss([autoprefixer(), cssSorter()])) //npx autoprefixer --infoで適応ブラウザを確認,css-sorterはソートの設定可能
      .pipe(mmq())
      .pipe(gulp.dest("./public/assets/css"))
      .pipe(cleanCss()) //圧縮
      .pipe(
        rename({
          suffix: ".min", //名前変更
        })
      )
      .pipe(gulp.dest("./public/assets/css/"))
  );
}

//scssファイルの更新を監視（自動で更新）
function watch() {
  //sass
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series(compileSass, browserReload)); //series順番に実行
  //pug
  gulp.watch("./src/assets/**/*.pug", gulp.series(compilePug,browserReload));
  //html
  gulp.watch("./assets/**/*.html", gulp.series(formatHTML,copyImage,browserReload));
  //js
  gulp.watch("./src/assets/**/*.js", gulp.series(minJS, browserReload));
}

//ブラウザ表示
function browserInit(done) {
  browserSync.init({
    server: {
      baseDir: "./public/",
    },
  });
  done();
}

//一回のリロード（タスク）を終了させるために'done’を記載
function browserReload(done) {
  browserSync.reload();
  done();
}

//JS圧縮
function minJS() {
  return gulp.src("./src/assets/js/*.js")
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./public/assets/js/"));
}

//HTML整理
function formatHTML(){
  return gulp.src('./src/*.html')
  .pipe(htmlBeautify({
    indent_size: 2,
    indent_with_tabs: true,
  }
  ))
  .pipe(gulp.dest('./public/'))
}

//画像コピー
function copyImage(){
  return gulp.src('./src/assets/img/*')
  //
  .pipe(gulp.dest('./public/assets/img/'))
}


//pug設定
function compilePug(){
  return gulp.src(['./src/assets/**/*.pug','!./src/assets/**/_*.pug'])//「_header.pug」などは出力させないファイルなので、’！’で除く
  //コンパイルの処理を書く
  .pipe(pug({
    pretty:true
  }))
  .pipe(gulp.dest('./public'))

};

//ターミナルでのコマンド指定（例：npx gulp compileSass）
exports.test = test;
exports.copyImage = copyImage;
exports.compileSass = compileSass;
exports.watch = watch;
exports.browserInit = browserInit;
exports.minJS = minJS;
exports.formatHTML = formatHTML;
exports.build = gulp.parallel(formatHTML, minJS, compileSass, copyImage);
exports.compilePug = compilePug;

exports.dev = gulp.parallel(browserInit, watch); //parallel並行に実行