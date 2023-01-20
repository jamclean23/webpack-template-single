// Common webpack config

const pages = ['index', 'about'];

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: pages.reduce((configured, page) => {
        configured[page] = './src/' + page + '/' + page + '.js';
        return configured;
    }, {}),
    output: {
        filename: '[name]/[name].bundle-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: pages.map((page) => {
        return new HtmlWebpackPlugin({
            template: './src/' + page + '/' + page + '.html',
            filename: page + '/' + page + '-' +'[contenthash]' + '.html',
            inject: true,
            chunks: [page],

        })
    }),
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
}