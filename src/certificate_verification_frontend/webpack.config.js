import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.jsx', // Update this line to match your main file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.wasm'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Update this to match your HTML file location
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.CERTIFICATE_VERIFICATION_BACKEND_CANISTER_ID': JSON.stringify(process.env.CANISTER_ID_CERTIFICATE_VERIFICATION_BACKEND || process.env.CANISTER_ID),
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    historyApiFallback: true,
    headers: {
      'Content-Security-Policy': "default-src 'self'; connect-src 'self' http://localhost:4943 https://icp0.io https://*.icp0.io https://icp-api.io https://ic0.app; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'",
    },
  },
};