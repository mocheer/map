var webpack = require('webpack');  
module.exports = {
    entry: {
        "map": './src/MapServer.ts'
    },
    output: {
        path: __dirname,
        filename: 'examples/js/[name].js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})//相当于webpack -p
    ]
}


