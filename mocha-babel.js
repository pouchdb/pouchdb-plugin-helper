require('babel-register')({
  presets: [require('babel-preset-es2015')],
  plugins: [require('kneden')],
  only: /test/
});
