const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve('src'),
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  entry: 'index.tsx',
  module: {
    rules: [
      /*
      {
        exclude: [/node_modules/],
        include: path.resolve('src'),
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
      },
      */
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: {
          loader: 'source-map-loader',
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: path.resolve(__dirname, 'public/index.html'),
      title: 'chess',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve('src'), 'node_modules'],
  },
};
