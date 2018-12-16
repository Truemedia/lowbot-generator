// Deps
const gulp = require('gulp');
const inquirer = require('inquirer');
// Module specific
const localeQ = require('./../modules/lowbot/locale/questions/name');
const Locale = require('./../modules/lowbot/locale/pipes/locale');


/**
  * Locale
  */
gulp.task('locale', function() {
  return inquirer.prompt([
      localeQ
    ]).then(answers =>
      new Locale(answers.localeName).pipeline().pipe( gulp.dest('./src/locale') )
    );
});
