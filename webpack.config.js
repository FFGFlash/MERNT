/* eslint-disable @typescript-eslint/no-var-requires */
const Path = require("path")
const WebpackNodeExternals = require("webpack-node-externals")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const WebpackShellPlugin = require("webpack-shell-plugin-next")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WebpackMerge = require("webpack-merge")

const { NODE_ENV = "production" } = process.env

const StyleLoader = [
  { loader: "css-loader", options: { importLoaders: 1 } },
  "postcss-loader",
  "sass-loader"
]
StyleLoader.unshift(
  NODE_ENV === "development" ? "style-loader" : MiniCssExtractPlugin.loader
)

const ConfigBase = {
  mode: NODE_ENV,
  module: {
    //* Used to add additional paths to the build directory
    generator: {
      "asset/resource": { outputPath: "assets" },
      "asset": { outputPath: "assets" }
    },
    rules: [
      //* Image Assets
      {
        test: /\.(?:(p)?j(fi(f)?|if|p(e(g)?|g)?)|(a)?(png|avif)|gif|webp|svg|ico|cur|tif(f)?|bmp)$/i,
        type: "asset/resource",
        generator: { outputPath: "assets/images", publicPath: "assets/images/" }
      },
      //* Font Assets
      {
        test: /\.(?:ttf|otf|woff(2)?)$/i,
        type: "asset/resource",
        generator: { outputPath: "assets/fonts", publicPath: "assets/fonts/" }
      },
      //* Json5 Support
      {
        test: /\.json5$/i,
        exclude: /node_modules/,
        use: "json5-loader",
        generator: { outputPath: "assets/json", publicPath: "assets/json/" }
      },
      //* CSV Support
      {
        test: /\.[ct]sv$/i,
        exclude: /node_modules/,
        use: "csv-loader",
        generator: { outputPath: "assets/json", publicPath: "assets/json/" }
      },
      //* XML Support
      {
        test: /\.xml$/i,
        exclude: /node_modules/,
        use: "xml-loader",
        generator: { outputPath: "assets/json", publicPath: "assets/json/" }
      },
      //* Typescript and Javascript Support
      {
        test: /\.[jt]sx?$/i,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      //* CSS, SASS and SCSS Support
      {
        test: /\.s?[ac]ss$/i,
        exclude: /node_modules/,
        use: StyleLoader
      }
    ]
  },
  //* Import resolver (how 'import Module from "./module"' gets resolved)
  resolve: {
    //* Extensions to try to resolve in-order ('import Module from "./module"' might get resolved to 'import Module from "./module.tsx"')
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json5",
      ".json",
      ".scss",
      ".sass",
      ".css",
      ".csv",
      ".xml"
    ]
  },
  //* Enable auto-compiling while in development environment
  watch: NODE_ENV === "development",
  //* How webpack resolves its loaders (custom loaders can be added to '{project_root}/loaders')
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
    minimizer: ["...", new CssMinimizerWebpackPlugin()]
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
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "src/client/index.html")
    })
  ],
  output: {
    path: Path.resolve(__dirname, "build/public"),
    filename: "bundle.js",
    publicPath: "/"
  }
}

NODE_ENV === "production" &&
  ClientConfig.plugins.push(new MiniCssExtractPlugin())

module.exports = [
  WebpackMerge.merge(ServerConfig, ConfigBase),
  WebpackMerge.merge(ClientConfig, ConfigBase)
]
