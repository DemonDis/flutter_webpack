
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');


module.exports = () => ({
  entry: "./build/web/main.dart.js",
  
  devServer: {
    port: 5001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'flutter',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Flutter': './build/web/main.dart.js',
      },
    }),
    new HtmlWebPackPlugin({
        template: "./build/web/index.html",
    }),
  ]
});