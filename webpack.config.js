const path = require('path');
const webpack = require('webpack')

// -- front end
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const Dotenv = require('dotenv-webpack')

module.exports = [{
  entry: {
	  main:'./src/main.js',
    controller: './src/controller.js',
    stage: './src/stage.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: 'public/js'
  },
  target: 'web',
  mode: 'development',
  module: {
      rules: [
          {
            test: /\.s?css$/,
            exclude: /node_modules/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
          },
      	  {
    	      test: /\.vue$/,
    	      use: 'vue-loader'
      	  },
          {
    	      test: /\.gif/,
    	      use: {
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: '/../assets'
              }
            }
      	  }
      ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "./dist/public/style.css"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: true
    })
  ],
  resolve: {
    alias: {
      // 'vue$': 'vue/dist/vue.min'
      'vue': 'vue/dist/vue'
    }
  }
}];
