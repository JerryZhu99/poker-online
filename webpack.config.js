var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path')

resolve = {
    extensions:[ '', '.js', '.css', ]
};
module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname,"/dist"),
        filename: "bundle.js"
    },

    module: {
        loaders: [
                    { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/assets/index.html",
            inject: "head",
        }),
        new ExtractTextPlugin("styles.css")
    ],
    devtool: "source-map"
};
