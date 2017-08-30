var webpack = require('webpack');
var path = require('path');

module.exports = {
    // devtools used for better error handling
    devtools: 'inline-source-map',
    // one entry for the hotloaded file, one entry for the bundle.js
    entry: [
        'webpack-hot-middleware/client',
        './client/client.js'
    ],
    output: {
        // path.resolve gives absolute path and resolve errors
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        // goes through each import/export and assigns ids
        new webpack.optimize.OccurenceOrderPlugin(),
        // Allows changes to be placed without reloading
        new webpack.HotModuleReplacementPlugin(),
        // stops building if there are errors
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                // regex for js and jsx
                test: /\.js$/,
                // transcompile loader for (es6 to es5, jsx to js, etc)
                loader: 'babel-loader',
                // will not load from exclude
                exclude: /node_modules/,
                // with query, no longer needs .babelrc
                query: {
                    // checkout package.json for presets
                    presets: ['react', 'es2015', 'react-hmre']
                }
            }
        ]
    }
};
