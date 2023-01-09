
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const path = require("path");

module.exports = (env, arg) => ({
  module: arg.mode === 'production' ? 'production' : 'development',
  devtool: arg.mode === 'production' ? 'source-map' : 'eval',

  entry:{
      main: "./build/web/main.dart.js"
  },
  
  devServer: {
    port: 5001,
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  },

  output:{
      publicPath: env.hasOwnProperty('WEBPACK_SERVE') ? 'http://localhost:5001/' : '/flutter/',
      path: path.resolve(__dirname, './build/web/'),
      filename: 'bundle.js'
  },

  module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader', "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  
    plugins: [
      new ModuleFederationPlugin({
        name: 'flutter',
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          './Flutter': './build/web/main.dart.js',
        },
        shared: {},
      }),
      new HtmlWebPackPlugin({
          template: "./build/web/index.html",
          source: "./build/web/index.html"
      }),
  ]
});