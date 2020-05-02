const { dirname } = require('path')

const Fiber = require('fibers')

const { series, src, dest, watch } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const sourcemaps = require('gulp-sourcemaps')

const isProd = process.env.NODE_ENV === 'production'

const assets = {
  styles: './src/*.scss',
  fonts: './src/fonts/**',
}

function compile() {
  const options = {
    fiber: Fiber,
    includePaths: [dirname(dirname(require.resolve('sass-bem')))],
  }
  const task = src(assets.styles)
    .pipe(sourcemaps.init())
    .pipe(sass(options).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))

  if (isProd) {
    task.pipe(cssmin())
  }

  return task.pipe(sourcemaps.write()).pipe(dest('./lib'))
}

function copyFonts() {
  return src(assets.fonts).pipe(cssmin()).pipe(dest('./lib/fonts'))
}

const build = series(compile, copyFonts)

module.exports = {
  build,
  watch() {
    return watch(Object.values(assets), {}, build)
  },
}
