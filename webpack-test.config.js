var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');

var config = {
    entry: './tests.js',
    output: {
        filename: './testBundle.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        fs: 'empty'
    },
    resolve: {
        modules: [
            "src",
            "tests",
            "node_modules",
        ]
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildExit: "mocha testBundle.js"
        })
    ]
};

module.exports = config;