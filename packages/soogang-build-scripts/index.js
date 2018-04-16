const addons = addonsArg => {
  let addons = [].concat.apply([], [addonsArg]).filter(Boolean)
  return addons.map(addonName => require(`./addons/webpack.${addonName}.js`))
}

module.exports = {
  addons,
}
