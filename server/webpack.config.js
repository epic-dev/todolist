const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {
    NODE_ENV = 'production',
} = process.env;

module.exports = {
    entry: './index.ts',
    mode: NODE_ENV,
    target: 'node',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: [ nodeExternals()],
    watch: NODE_ENV === 'development'
}