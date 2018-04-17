const merge = require('webpack-merge')
const addons = addonsArg => {
  let addons = [].concat.apply([], [addonsArg]).filter(Boolean)
  return addons.map(addonName => require(`./addons/webpack.${addonName}.js`))
}

module.exports = env =>
  merge(
    require(`soogang-build-scripts/webpack.${env ? env.env : 'dev'}.js`),
    ...addons(env ? env.addons : [])
  )
