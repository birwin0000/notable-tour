const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index.js",
  },
  output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  },
}



/*
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "index.js",
    library: "notabletour"
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin({
      terserOptions: {
          keep_classnames: true,
          keep_fnames: true
      }
    })]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  }
};

export default config;

*/