// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");
const TerserPlugin = require("terser-webpack-plugin");



const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: 'index.html',
      favicon: "./src/favicon.ico",
      inject: false
    }),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /\.(webp)$/i,
          attributes: { as: 'image' },
        },
      ],
    }),
    // new CompressionPlugin({
    //   deleteOriginalAssets: false,
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          stylesHandler,
          {
            loader: 'css-loader',
            options: {
              //modules: true,
            },
          },
          //"postcss-loader"
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp)$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    minimizer: [
      `...`,
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.sharpMinify,
      //     options: {
      //       encodeOptions: {
      //         jpeg: {
      //           quality: 100,
      //         },
      //         webp: {
      //           lossless: false,
      //         },
      //         avif: {
      //           lossless: true,
      //         },
      //         png: {},
      //         gif: {},
      //       },
      //     },
      //   },
      // }),
    ],
    minimize: true,
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin({
      filename: "[name].css",
    }));
  } else {
    config.mode = "development";
  }
  return config;
};
