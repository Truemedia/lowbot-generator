const lazypipe = require('lazypipe');
const gulpPlugins = require('auto-plug')('gulp');
const Pipe = require('./../../../../classes/pipe');

class Templates extends Pipe
{
  constructor(tplName)
  {
    super();
    this.tplName = tplName;
  }

  get pipeline()
  {
    let {tplName} = this;

    return lazypipe()
      .pipe(gulpPlugins.addSrc, this.tplPath(__dirname, '*.hbs')) // Files
      .pipe(gulpPlugins.template, { // Templating
        tplName
      })
      .pipe(gulpPlugins.rename, (file) => { // Directory and filename
        if (file.basename.includes('ssml')) {
          file.dirname = './speech';
        } else if (file.basename.includes('body')) {
          file.dirname = './display';
        }
        file.basename = file.basename.replace('template', tplName);
      });
  }
}

module.exports = Templates;
