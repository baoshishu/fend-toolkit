'use strict'

const plugins = [
  require('@babel/plugin-proposal-decorators').default,
  require('@babel/plugin-transform-async-to-generator').default,
  require('@babel/plugin-proposal-class-properties').default,
  [
    require('@babel/plugin-proposal-object-rest-spread').default,
    {
      userBuiltIns: true,
    },
  ],
  [
    require('@babel/plugin-transform-react-jsx').default,
    {
      useBuiltIns: true,
    },
  ],
  [
    require('@babel/plugin-transform-runtime').default,
    {
      helpers: false,
      polyfill: false,
    },
  ],
  require('@babel/plugin-syntax-dynamic-import').default,
  'react-hot-loader/babel',
]

module.exports = function(api, opts) {
  return {
    presets: [
      [
        require('@babel/preset-env').default,
        {
          useBuiltIns: 'entry',
          modules: false,
        },
      ],
      require('@babel/preset-react').default,
      require('@babel/preset-flow').default,
    ],
    plugins: plugins,
  }
}
