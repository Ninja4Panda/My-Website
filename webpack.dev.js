const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name]-[contentHash].js',
        path: path.resolve(__dirname, './build_dev')
    }
});