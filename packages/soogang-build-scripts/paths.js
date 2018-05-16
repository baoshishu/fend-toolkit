const path = require('path')
const fs = require('fs')
const findPkg = require('find-pkg')
const globby = require('globby')

const appDirectory = process.cwd()
module.exports.appPath = appDirectory
module.exports.srcPaths = [appDirectory]

const findPkgs = (rootPath, globPatterns) => {
  const globOpts = {
    cwd: rootPath,
    strict: true,
    absolute: true,
  }
  return globPatterns
    .reduce(
      (pkgs, pattern) =>
        pkgs.concat(globby.sync(path.join(pattern, 'package.json'), globOpts)),
      []
    )
    .map(f => path.dirname(path.normalize(f)))
}

const getMonorepoPkgPaths = () => {
  const monoPkgPath = findPkg.sync(path.resolve(appDirectory, '../..'))
  if (monoPkgPath) {
    // get monorepo config from yarn workspace
    const pkgPatterns = require(monoPkgPath).workspaces
    const pkgPaths = findPkgs(path.dirname(monoPkgPath), pkgPatterns)
    // only include monorepo pkgs if app itself is included in monorepo
    if (pkgPaths.indexOf(appDirectory) !== -1) {
      return pkgPaths.filter(f => fs.realpathSync(f) !== appDirectory)
    }
  }
  return []
}

Array.prototype.push.apply(module.exports.srcPaths, getMonorepoPkgPaths())
