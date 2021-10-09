const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  }

  if (!isDev) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
    config.minimize = true;
  }
  return config
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  devtool: isDev ? 'cheap-source-map' : false,
  entry: './js/index.js',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],

  optimization: optimization(),

  devServer: {},
};
