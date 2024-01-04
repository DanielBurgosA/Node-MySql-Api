const path = require('path');
const BrowserifyZlib = require.resolve('browserify-zlib');
const ReadableStream = require.resolve('readable-stream');
const CryptoBrowserify = require.resolve('crypto-browserify');
const PgHstore = require.resolve('pg-hstore');
const Assert = require.resolve('assert/');
const OsBrowserify = require.resolve('os-browserify/browser');
const StreamHttp = require.resolve('stream-http');
const QuerystringEs3 = require.resolve('querystring-es3');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      fs: false,
      zlib: BrowserifyZlib,
      stream: ReadableStream,
      buffer: require.resolve('buffer/'),
      url: require.resolve('url/'),
      crypto: CryptoBrowserify,
      'pg-hstore': PgHstore,
      assert: Assert,
      os: OsBrowserify,
      http: StreamHttp,
      net: false, // Adjust based on the requirements
      querystring: QuerystringEs3,
      // Add other fallbacks as needed
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};