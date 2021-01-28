const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'game': './src/Game/signup.js'
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'file-loader',
                    options:{
                        name: '[name]-[contentHash].[ext]',
                        outputPath:(url, resourcePath, context) => {
                            if (/Main/.test(resourcePath)) {
                                return `/Main/assests/${url}`;
                            } else if (/Game/.test(resourcePath)) {
                                return `/Game/assests/${url}`;
                            } else if (/Error/.test(resourcePath)) {
                                return `/Error/assests/${url}`;
                            }
                            return `/${url}`;
                        }
                    }
                }
            }
        ]
    }
};