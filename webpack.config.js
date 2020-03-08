/* eslint-disable no-undef */

const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = env => {
  process.env.NODE_ENV = env.mode;

  return {
    mode: env.mode,
    context: path.resolve(__dirname),
    entry: "./src/index.js",
    watch: true,
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: "bundle.js",
      chunkFilename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          loader: ["babel-loader", "eslint-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
      }),
      new webpack.ProgressPlugin(),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devtool: "source-map",
    devServer: {
      contentBase: "/dist/",
      inline: true,
      host: "localhost",
      port: 8080,
    },
  };
};
