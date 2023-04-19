'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    entry : {
        main: './src',
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: 'dist/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'ExpandableTree',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /src/,
                use: ['babel-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/style.scss',
                to: 'dist/[name].[ext]'
            }]
        })
    ],

    externals: [
      nodeExternals({
        // load non-javascript files with extensions, presumably via loaders
        allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
      })
    ]
}

module.exports = config;
