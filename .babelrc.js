module.exports = {
  presets: [['react-app', { flow: false, typescript: true }]],
  plugins: ['react-hot-loader/babel', require.resolve('./config/cssModulesHelper.js')],
};
