const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        Game: './src/Game/signup.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'file-loader',
                    options:{
                        name: "[name]-[hash].[ext]",
                        outputPath:"assests"
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'Game/game.html',
            template: 'src/Game/game.html',
            cache: true,
            hash:true
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
    ]
};