require('babel-register')({
  presets: [require('babel-preset-es2015')],
  plugins: [require('babel-plugin-transform-async-to-generator')],
  only: /test/
});
