const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name]-[contentHash].bundle.js',
        path: path.resolve(__dirname, './build_dev')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'Game/game.html',
            template: 'src/Game/game.html',
            hash:true,            
            chunks: ['game'],
            favicon:'src/favicon.ico'
        }),        
        new HtmlWebpackPlugin({
            filename: 'Recipe/recipe.html',
            template: 'src/Recipe/recipe.html',
            favicon:'src/favicon.ico',
            chunks: [],
        }),        
        new HtmlWebpackPlugin({
            filename: 'Main/index.html',
            template: 'src/Main/index.html',
            inject:false
        }),
        new HtmlWebpackPlugin({
            filename: 'Error/error.html',
            template: 'src/Error/error.html',
            inject:false
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
        ]
    }
});