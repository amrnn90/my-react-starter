/* eslint-disable no-undef */

const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const webpackMerge = require("webpack-merge");

const srcPath = path.join(__dirname, "src");
const indexTemplate = path.join(srcPath, "index.html");
const staticPath = path.join(srcPath, "static");

module.exports = env => {
  process.env.NODE_ENV = env.mode;

  return webpackMerge(
    {
      mode: env.mode,
      context: path.resolve(__dirname),
      entry: path.join(srcPath, "index.js"),
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
            test: /\.svg$/,
            use: {
              loader: "@svgr/webpack",
              options: {},
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
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(env.mode),
        }),
        new webpack.ProgressPlugin(),
        new FriendlyErrorsWebpackPlugin(),
      ],
      optimization: {
        minimize: env.mode === "production",
        minimizer: [
          new TerserWebpackPlugin({
            extractComments: false,
          }),
          new OptimizeCssAssetsPlugin(),
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
        alias: {
          "react-dom": "@hot-loader/react-dom",
        },
      },
      devtool: "source-map",
      stats: {
        modules: false,
        children: false,
        hash: false,
        entrypoints: false,
        excludeAssets: [/hot-update/],
      },
      devServer: {
        compress: true,
        historyApiFallback: true,
        open: true,
        overlay: true,
        host: "localhost",
        port: 3000,
        /** check out proxy settings */
      },
    },
    conditionalPlugins(),
    env.mode == "development" ? devConfig() : prodConfig()
  );
};

const conditionalPlugins = () => {
  const plugins = [];
  if (staticPath) {
    plugins.push(new CopyPlugin([{ from: staticPath, to: "./static" }]));
  }

  if (indexTemplate) {
    plugins.push(
      new HtmlWebPackPlugin({
        template: indexTemplate,
        filename: "./index.html",
      })
    );
  }

  return {
    plugins,
  };
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
        "static/**/*",
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
