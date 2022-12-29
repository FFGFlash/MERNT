/* eslint-disable @typescript-eslint/no-var-requires */
const Path = require("path")
const WebpackNodeExternals = require("webpack-node-externals")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const CSSMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const WebpackShellPlugin = require("webpack-shell-plugin-next")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WebpackMerge = require("webpack-merge")

const { NODE_ENV = "production" } = process.env

const ConfigBase = {
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/i,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          NODE_ENV === "development"
            ? "style-loader"
            : MiniCSSExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: [
          NODE_ENV === "development"
            ? "style-loader"
            : MiniCSSExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader"
        ]
      },
      { test: /\.(?:ico|gif|png|jp(2)?g)$/i, type: "asset/resource" },
      { test: /\.(woff(2)?|eot|ttf|otf|svg)$/i, type: "asset/inline" }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".sass"]
  },
  watch: NODE_ENV === "development",
  resolveLoader: {
    modules: ["node_modules", Path.resolve(__dirname, "loaders")]
  },
  infrastructureLogging: {
    level: "info",
    debug: ["sass-loader"]
  },
  stats: {
    loggingDebug: ["sass-loader"]
  },
  experiments: {
    topLevelAwait: true
  },
  optimization: {
    minimizer: ["...", new CSSMinimizerWebpackPlugin()]
  }
}

const ServerConfig = {
  name: "Server",
  entry: Path.resolve(__dirname, "src/server/index.ts"),
  target: "node",
  externals: [WebpackNodeExternals()],
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: {
        scripts: ["rimraf build"],
        blocking: true,
        parallel: false
      }
    })
  ],
  output: {
    path: Path.resolve(__dirname, "build"),
    filename: "index.js"
  }
}

NODE_ENV === "development" &&
  ServerConfig.plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: ["nodemon ."],
        blocking: false,
        parallel: true
      }
    })
  )

const ClientConfig = {
  name: "Client",
  entry: Path.resolve(__dirname, "src/client/index.ts"),
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: {
        scripts: ["rimraf build/public"],
        blocking: true,
        parallel: false
      }
    }),
    new HTMLWebpackPlugin({
      template: Path.resolve(__dirname, "src/client/index.html")
    })
  ],
  output: {
    path: Path.resolve(__dirname, "build/public"),
    filename: "bundle.js"
  }
}

NODE_ENV === "production" &&
  ClientConfig.plugins.push(new MiniCssExtractPlugin())

module.exports = [
  WebpackMerge.merge(ServerConfig, ConfigBase),
  WebpackMerge.merge(ClientConfig, ConfigBase)
]
