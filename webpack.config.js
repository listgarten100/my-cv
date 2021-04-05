const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./assets/js/main.js", // основной JS
    output: {
      filename: "js/[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: "img/[name][ext]", // для картинок
      clean: true,
    },
    module: {
      rules: [
        // SCSS
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [require("autoprefixer"), isProd ? require("cssnano")() : false].filter(Boolean),
                },
              },
            },
            "sass-loader",
          ],
        },
        // JS
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        // Изображения
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
        },
        // Шрифты
        {
          test: /\.(woff2?|ttf|eot)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
        // HTML (если нужен импорт в JS)
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        template: "./assets/index.html", // твой основной HTML
        minify: isProd
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
      }),
      new CopyPlugin({
        patterns: [
          { from: "assets/img", to: "img" },
          { from: "assets/fonts", to: "fonts" },
          { from: "assets/file", to: "file" },
        ],
      }),
    ],
    optimization: {
      minimize: isProd,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      hot: true,
      open: true,
      compress: true,
      port: 3000,
    },
    devtool: isProd ? false : "source-map",
  };
};
