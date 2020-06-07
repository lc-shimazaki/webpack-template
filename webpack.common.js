const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {ProvidePlugin} = require('webpack');

module.exports = ({outputFile, assetFile}) => ({
    mode: 'development', // 分割
    devtool: 'none', // 分割
    entry: {
        app: './src/js/app.js',
        sub: './src/js/sub.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${outputFile}.js`,
        chunkFilename: `${outputFile}.js`
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif|woff2?|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `${assetFile}.[ext]`, // 分割
                            outputPath: 'images',
                            publicPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${outputFile}.css`
        }),
        new ProvidePlugin({
            jQeury: 'jquery',
            $: 'jquery',
            utils: [path.resolve(__dirname, 'src/js/utils'), 'default']
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0, // 30000
            cacheGroups: {
                defaultVendors: {
                    name: "vendors",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                utils: {
                    name: "utils",
                    test: /src[\\/]js[\\/]utils/
                },
                default: false
            }
        }
    },
    resolve: {
        alias: {
            '@scss': path.resolve(__dirname, 'src/scss'),
            '@images': path.resolve(__dirname, 'src/images')
        },
        extensions: ['.js', '.scss'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
});