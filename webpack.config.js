var glob = require("glob");

var externalRef = {
  "react": "React",
  "react-dom": "ReactDOM",
  "amazeui-dingtalk": "AMUIDingTalk",
  'react-addons-css-transition-group': {
    root: ['React', 'addons', 'CSSTransitionGroup'],
    commonjs2: 'react-addons-css-transition-group',
    commonjs: 'react-addons-css-transition-group',
    amd: 'react-addons-css-transition-group'
  }
};

var debugConfig = {
  watch: false,
  mode: "development",
  entry: "./src/public/script/view/mainPage.tsx",
  output: {
    path: __dirname + '/debug/public/script/',
    filename: '[name].js',
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader?{configFileName: \"./tsconfig.json\"}"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  externals: externalRef,
};

var testConfig = {
  watch: false,
  mode: "development",
  entry: glob.sync("./src/test/client/*.test.ts"),
  output: {
    path: __dirname + '/debug/test/client/',
    filename: '[name].test.js',
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader?{configFileName: \"./tsconfig.json\"}"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  externals: externalRef,
}
module.exports = [debugConfig, testConfig];