/*
const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/NotableTour.js",
  },
  output: {
      filename: "[name].js",
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
*/


import path from 'path';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: 'development',
  devtool: false,
  entry: './src/NotableTour.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "index.js",
    library: "notabletour"
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


/*
module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
  */