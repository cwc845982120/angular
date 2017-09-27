var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: {
        app: ['./index.ts'],
        //公共文件
        ventor: ['@angular/platform-browser-dynamic', '@angular/core', 'axios']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './static/js/[name]-[hash].js'
    },
    // require 文件时可省略后缀 .js 和 .ts
    resolve: {
        extensions: ['.js', '.ts', '.scss'],
        // 路径别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'app': path.resolve(__dirname, 'src/app'),
            'common': path.resolve(__dirname, 'src/common'),
            'static': path.resolve(__dirname, 'src/static')
        }
    },
    // 配置 webpack-dev-server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        open: true,
        port: 3333 // 修改端口，一般默认是8080
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            // vendor 的意义和之前相同
            // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
            names: ['vendor', 'manifest'],
            // 配合 manifest 文件使用
            minChunks: Infinity
        }),
        // 只删除 dist 文件夹下的 bundle 和 manifest 文件
        new CleanWebpackPlugin(['dist/**'], {
            // 打印 log
            verbose: true,
            // 删除文件
            dry: false
        }),
        // 我们这里将之前的 HTML 文件当做模板
        // 注意在之前 HTML 文件中请务必删除之前引入的 JS 文件
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        // 输出的文件路径
        new ExtractTextPlugin("./static/css/[name].[hash].css"),
        // 压缩提取出的 CSS，并解决ExtractTextPlugin分离出的 JS 重复问题
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // 压缩 JS 代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //文件复制
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/static'),
            to: './static'
        }]),
        //开启全局的模块热替换(HMR)
        new webpack.HotModuleReplacementPlugin(),
        //保证出错时页面不阻塞，且会在编译结束后报错
        new webpack.NoEmitOnErrorsPlugin(),
        //解决webpack编译 警告问题
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, './src')
        )
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }, {
            test: /\.scss$/,
            // 写法和之前基本一致
            loader: ExtractTextPlugin.extract({
                // 必须这样写，否则会报错
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: false,
                        module: false,
                        minimize: true,
                        localIdentName: "[name]_[local]_[hash:base64:3]"
                    }
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }, {
            // 图片格式正则
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                // 配置 url-loader 的可选项
                options: {
                    // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
                    limit: 10000,
                    // 超出限制，创建的文件格式
                    // build/images/[图片名].[hash].[图片格式]
                    name: 'static/img/[name].[hash].[ext]'
                }
            }]
        }]
    },
    // 生成 source-map，用于打断点，这里有好几个选项
    devtool: '#cheap-module-eval-source-map',
};