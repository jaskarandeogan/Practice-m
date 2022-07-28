const path = require('path');
module.exports = {
devtool:"source-map",
mode:"development",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
        {
          test:/\.css$/,
          use:['style-loader', 'css-loader']
        },
        { test: /\.m?js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react' ]
            }
          }
      }
    ]
}
};

// npm install webpack webpack-cli style-loader css-loader babel-loader @babel/core @babel/preset-env @babel/preset-react

// add "watch": "webpack --watch" to package.json