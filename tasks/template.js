// Deps
const gulp = require('gulp');
const inquirer = require('inquirer');
// Module specific
const templateQ = require('./../modules/lowbot/template/questions/name.json');
const Templates = require('./../modules/lowbot/template/pipes/templates');

/**
  * Template
  */
gulp.task('template', function() {
  return inquirer.prompt([
      templateQ
    ]).then(answers =>
      new Templates({tplName: answers.templateName}).pipeline().pipe( gulp.dest('./src/tpl') )
    );
});
