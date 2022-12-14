const CopyFilesPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  plugins: [
    new CopyFilesPlugin({
      patterns: [
        {
          from: path.join(path.dirname(require.resolve('@twitch-boba/overlay/package.json')), 'dist/public/overlay/'),
          to: './public/overlay/'
        },
        {
          from: path.join(path.dirname(require.resolve('@twitch-boba/oauth-redirect-page/package.json')), 'dist/'),
          to: './public/twitch-oauth/'
        }
      ]
    })
  ]
};
