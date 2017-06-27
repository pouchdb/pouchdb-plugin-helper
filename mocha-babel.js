require('babel-register')({
  presets: [require('babel-preset-es2015')],
  plugins: [require('babel-plugin-async-to-promises')],
  only: /test/
});
