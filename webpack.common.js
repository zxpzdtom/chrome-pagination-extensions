const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  entry: {
    popup: path.join(__dirname, './src/popup'),
    background: path.join(__dirname, 'src/background'),
    content_scripts: path.join(__dirname, 'src/content_scripts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", "*"],
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                modifyVars: {
                  'primary-color': '#FF579A'
                },
                javascriptEnabled: true,
              }
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      }
    ],
  },
}
