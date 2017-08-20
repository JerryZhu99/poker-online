var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');



module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use:"css-loader",
                    fallback: "style-loader"
                })              
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/assets/index.html",
        }),
        new ExtractTextPlugin({filename:"index.css"})
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
    devtool: "source-map",
    node: { console: true },
};
