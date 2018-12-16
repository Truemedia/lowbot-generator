// Deps
const gulp = require('gulp');
const inquirer = require('inquirer');
// Module specific
const resolverQ = require('./../modules/lowbot/resolver/questions/name.json');
const templateQ = require('./../modules/lowbot/template/questions/name.json');
const Resolver = require('./../modules/lowbot/resolver/pipes/resolver');

/**
  * Resolver
  */
gulp.task('resolver', function() {
  return inquirer.prompt([
      resolverQ, Object.assign(templateQ, {default: answers => answers.resolverName})
    ]).then(answers =>
      new Resolver(answers.resolverName, answers.templateName).pipeline().pipe( gulp.dest('./src/resolvers') )
    );
});
