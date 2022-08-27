const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index-template.html',
        }),
    ],
    resolve: {
        extensions: ['', '.ts']
    },
    entry: './src/main.ts',
    mode: 'development',
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader' },
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/public/twitch-oauth/',
    },
    externals: [nodeExternals()],
}