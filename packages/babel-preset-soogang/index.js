'use strict'

var env = process.env.BABEL_ENV || process.env.NODE_ENV;
var isEnvDevelopment = env === 'development';
var isEnvProduction = env === 'production';
var isEnvTest = env === 'test';

const plugins = [
  [require('@babel/plugin-proposal-decorators').default,
    {
      legacy: true
    }
  ],
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
  isEnvTest ? 'babel-plugin-dynamic-import-node-babel-7': require('@babel/plugin-syntax-dynamic-import').default,
  isEnvTest ? null: 'react-hot-loader/babel',
].filter(Boolean)

module.exports = function(api, opts) {
  return {
    presets: [
      [
        require('@babel/preset-env').default,
        {
          useBuiltIns: 'entry',
          modules: isEnvTest? 'commonjs':false,
        },
      ],
      require('@babel/preset-react').default,
      require('@babel/preset-flow').default,
    ],
    plugins: plugins,
  }
}
