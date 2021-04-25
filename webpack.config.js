const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fse = require("fs-extra");

let config = {};

if (currentTask === "dev") {
  config.entry = "./app/assets/scripts/app.js";
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  };
  config.mode = "development";
  config.devServer = {
    before: (app, server) => {
      server._watch("./app/**/*.html");
    },
    port: 3501,
    contentBase: path.resolve(__dirname, "app"),
    hot: true,
  };
  config.module = {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: 3, targets: "defaults" },
              ],
            ],
          },
        },
      },
    ],
  };
}

if (currentTask === "sw") {
  config.entry = "./app/sw/sw.js";
  config.output = {
    filename: "swBundled.js",
    path: path.resolve(__dirname, "app"),
  };
  config.watch = true;
  config.module = {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules | bower_components) /,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  };
}

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", () => {
      fse.copySync("./app/index.html", "./dist/index.html");
      fse.copySync("./app/assets/images", "./dist/assets/images");
    });
  }
}

if (currentTask === "build") {
  config.entry = "./app/assets/scripts/app.js";
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "dist"),
  };
  config.mode = "production";
  config.plugins = [
    new MiniCssExtractPlugin({ filename: "main.css" }),
    new RunAfterCompile(),
  ];
  config.module = {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules | bower_components) /,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  };
}

module.exports = config;
