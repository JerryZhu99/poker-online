var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var nodeExternals = require('webpack-node-externals');



module.exports = [{
        entry: "./src/client.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
            libraryTarget: "var",
            library: "app"
        },
        module: {
            rules: [{
                    test: /\.(jpg|png|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        use: "css-loader",
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "src/assets/index.html",
            }),
            new ExtractTextPlugin({
                filename: "index.css",
            })
        ],
        resolve: {
            modules: [
                "src",
                "node_modules",
            ],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        devtool: "inline-source-map",
        node: {
            console: true
        },
    },
    {
        entry: "./src/server.js",
        target: "node",
        node: {
            console: true,
        },
        output: {
            path: path.resolve(__dirname),
            filename: "server.js",
            libraryTarget: 'var',
            library: "app",
            devtoolModuleFilenameTemplate: '[absolute-resource-path]'
        },
        resolve: {
            modules: [
                "src",
                "node_modules",
            ]
        },
        externals: [nodeExternals()],
        devtool: 'inline-source-map'
    }
];