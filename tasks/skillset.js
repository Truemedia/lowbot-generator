// Deps
const gulp = require('gulp');
const inquirer = require('inquirer');
// Module specific
const skillsetQ = require('./../modules/lowbot/skillset/questions/name.json');

/**
  * Skillset
  */
gulp.task('skillset', function() {
  return inquirer.prompt([
      defaults.authorName,
      skillsetQ
    ]).then( (answers) => {
      console.log('gotcha', answers);
    });
});
