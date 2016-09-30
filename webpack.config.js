var webpack = require('webpack');  
module.exports = {
    entry: {
        "map": './src/Map.ts'
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
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),//相当于webpack -p
        new webpack.NoErrorsPlugin()
    ]
}


