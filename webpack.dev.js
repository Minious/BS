const path = require("path");
const merge = require("webpack-merge");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    writeToDisk: true,
    host: "0.0.0.0",
    public: "localhost:8080",
  },
  devtool: "source-map",
});
