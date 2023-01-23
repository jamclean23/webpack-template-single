// Common webpack config

// Add a string to the array to generate a new associated folder with an html file from  a template
const pages = ['index', 'about'];

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    // Returns an object with entry points, formed from the pages array
    entry: pages.reduce((configured, page) => {
        configured[page] = './src/' + page + '/' + page + '.js';
        return configured;
    }, {}),
    // Outputs folder for each entry point
    output: {
        filename: '[name]/[name].bundle-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    // Creates html file for every entry point, outputs to the folder of the same name
    // Additional plugins may be concatted to the end of the array or placed in the original array
    plugins: [].concat(pages.map((page) => {
        return new HtmlWebpackPlugin({
            template: './src/' + page + '/' + page + '.html',
            filename: page + '/' + page + '-' +'[contenthash]' + '.html',
            inject: true,
            chunks: [page],

        })
    })),
    // Split chunks for accessibility
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [

            // html-loader processes asset management in html source files
            {
                test: /\.html$/i,
                use: 'html-loader',
            },
        ],
    },
}