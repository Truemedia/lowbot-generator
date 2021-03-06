/*
 * slush-lowbot
 * https://github.com/Truemedia/slush-lowbot
 *
 * Copyright (c) 2018, Wade Penistone
 * Licensed under the MIT license.
 */

const gulp = require('gulp');
const gulpPlugins = require('auto-plug')('gulp');
const _ = require('underscore.string');
const inquirer = require('inquirer');
const path = require('path');
const requireDir = require('require-dir');
requireDir(__dirname + '/tasks', { recurse: true });

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    }
    else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function (done) {
    var prompts = [{
        name: 'appName',
        message: 'What is the name of your project?',
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: 'What is the description?'
    }, {
        name: 'appVersion',
        message: 'What is the version of your project?',
        default: '0.1.0'
    }, {
        name: 'authorName',
        message: 'What is the author name?',
        default: defaults.authorName
    }, {
        name: 'authorEmail',
        message: 'What is the author email?',
        default: defaults.authorEmail
    }, {
        name: 'userName',
        message: 'What is the github username?',
        default: defaults.userName
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }];
    //Ask
    inquirer
        .prompt(prompts)
        .then(function (answers) {
            console.log(answers);
            done();
            // if (!answers.moveon) {
            //     return done();
            // }
            // answers.appNameSlug = _.slugify(answers.appName);
            // gulp.src(__dirname + '/templates/**')
            //     .pipe( gulpPlugins.template(answers) )
            //     .pipe( gulpPlugins.rename(function (file) {
            //         if (file.basename[0] === '_') {
            //             file.basename = '.' + file.basename.slice(1);
            //         }
            //     }) )
            //     .pipe( gulpPlugins.conflict('./') )
            //     .pipe(gulp.dest('./'))
            //     .pipe( gulpPlugins.install() )
            //     .on('end', function () {
            //         done();
            //     });
        });
});
