const path = require("path");

module.exports = {
  entry: {
    popup: "./src/popup.ts",
    content: "./src/content.ts",
    manager: "./src/manager.ts",
    review: "./src/review.ts"
  },
  
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devtool: "cheap-module-source-map", 
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
};
