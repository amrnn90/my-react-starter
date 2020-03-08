/* eslint-disable no-undef */

const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpackMerge = require("webpack-merge");

module.exports = env => {
  process.env.NODE_ENV = env.mode;

  return webpackMerge(
    {
      mode: env.mode,
      context: path.resolve(__dirname),
      entry: "./src/index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "js/bundle.js",
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
            test: /\.(png|jpe?g|gif)$/i,
            use: {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "images/[name].[hash:8].[ext]",
              },
            },
          },
          {
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            loader: "file-loader",
            options: {
              name: "fonts/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      plugins: [
        new CopyPlugin([{ from: "./public", to: "./" }]),
        new HtmlWebPackPlugin({
          template: "./public/index.html",
          filename: "./index.html",
        }),
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(env.mode),
        }),
        new webpack.ProgressPlugin(),
      ],
      optimization: {
        minimize: env.mode === "production",
        minimizer: [new TerserWebpackPlugin(), new OptimizeCssAssetsPlugin()],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
      devtool: "source-map",
      devServer: {
        stats: {
          modules: false,
          children: false,
          hash: false,
        },
        compress: true,
        historyApiFallback: true,
        open: true,
        overlay: true,
        host: "localhost",
        port: 3000,
        /** check out proxy settings */
      },
    },
    env.mode == "development" ? devConfig() : prodConfig()
  );
};

const prodConfig = () => ({
  devtool: "source-map",
  output: {
    filename: "js/bundle.[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "js/**/*",
        "css/**/*",
        "images/**/*",
        "fonts/**/*",
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/styles.[hash:8].css",
    }),
  ],
});

const devConfig = () => ({
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
});
