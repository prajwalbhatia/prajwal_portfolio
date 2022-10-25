const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type : 'asset/resource'
      },
      {
        test: /\.svg$/,
        use: {
          loader: '@svgr/webpack'
        },
      },
      { 
        test: /\.(woff|woff2|eot|ttf|otf)$/i, 
        type: 'asset/resource'  
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Prajwal Bhatia | Frontend Dev.',
      filename: 'index.html',
      template: 'src/public/index.html',
      favicon : 'src/public/favicon.ico'
    })
  ],
  resolve: {
    alias: {
      'Assets': path.resolve(__dirname, 'src/assets/'),
      'Components': path.resolve(__dirname, 'src/components/'),
      'Src': path.resolve(__dirname, 'src/'),
      'Hooks' : path.resolve(__dirname , 'src/hooks'),
      'Pages' : path.resolve(__dirname , 'src/pages'),
      'Styles' : path.resolve(__dirname , 'src/styles'),
      'Utilities' : path.resolve(__dirname, 'src/utilities')
    }
  }
}