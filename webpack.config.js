const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
  	filename: 'main.js',
  	path: path.resolve(__dirname, 'dist'),
  },
  module: {
  	rules: [
  	  {
  	    test: /\.js$/,
  	    exclude: /node_modules/,
  	    use: {
  	  	  loader: 'babel-loader',
  	  	  options: {
  	  	    presets: ['@babel/preset-env']
  	  	  }
  	  	}
  	  },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
  	],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};