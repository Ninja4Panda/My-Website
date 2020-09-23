const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production', 
    entry: {
        Game: './src/Game/signup.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '/dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
};