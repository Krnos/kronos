const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const async = require('async')
const { pascalCase } = require('change-case')
// const fs = require('fs-extra')
const render = require('consolidate').handlebars.render

// register handlebars helper
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b
    ? opts.fn(this)
    : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b
    ? opts.inverse(this)
    : opts.fn(this)
})

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} model
 * @param {String} src
 * @param {String} dest
 * @param {Function} done
 */

module.exports = async function generate (model, src, dest, done) {
  let pascalCaseSigular = pascalCase(model)
  const metalsmith = Metalsmith(src)
  Object.assign(metalsmith.metadata(), {
    model: model,
    pascalCaseSigular: pascalCaseSigular,
    destDirName: model,
    inPlace: dest === process.cwd(),
    noEscape: true
  })

  await metalsmith.use(renderTemplateFiles())

  // await copyFiles(src, dest)

  return new Promise(resolve => {
    metalsmith.clean(false)
      .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
      .destination(dest)
      .build((err, files) => {
        done(err)
        resolve('resolved')
      })
  })
}
/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function renderTemplateFiles (skipInterpolation) {
  skipInterpolation = typeof skipInterpolation === 'string'
    ? [skipInterpolation]
    : skipInterpolation
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    const metalsmithMetadata = metalsmith.metadata()
    async.each(keys, (file, next) => {
      // skipping files with skipInterpolation option
      const str = files[file].contents.toString()
      // do not attempt to render files that do not have mustaches
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }
      render(str, metalsmithMetadata, (err, res) => {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        // eslint-disable-next-line
        files[file].contents = new Buffer.from(res)
        next()
      })
    }, done)
  }
}

/**
 * Copy backend files
 *
 * @param {String} src
 * @param {String} dest
 */
// async function copyFiles (src, dest) {
//   await fs.copy(`${src}(base)`, dest)
// }
