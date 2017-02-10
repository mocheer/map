const webpack = require('webpack')
const version = require('./node_modules/shell/nodejs/version.js')
const dir = __dirname //当前模块文件所在目录
const env = process.env //webpack执行环境
var plugins = [
    new webpack.BannerPlugin(version),
    new webpack.NoErrorsPlugin(),
]

switch (env.task) {
    //开发环境
    case 'dev':
        break;
    //生产环境
    case 'build':
        plugins.push(
            //相当于 webpack -p
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        )
        break;
}

module.exports = {
    entry: {
        'map': './index.js',
    },
    output: {
        publicPath: '',// 开发代码中url的转换拼接处理,通常是代码中各种资源的地址,比如图片等, url目录前缀或完整网址url前缀'http://cdn.com/'
        path: __dirname,
        filename: 'examples/js/[name].js'
    },
    //script引入js类库，通过require或import的方式来使用，却不希望webpack把它编译到输出文件中。
    externals: {
    },
    //自动补全的后缀
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        preLoaders:[
            { test: /\.ts$/, loader: 'ts-loader' }
        ],
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules|bower_components)/,//npm,bower
                loader: 'babel-loader'
            }
        ],
    },
    plugins: plugins
}