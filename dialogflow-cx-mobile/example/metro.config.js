const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..'); // path to monorepo root

const config = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  alias: {
    'dialogflow-cx-mobile': path.resolve(__dirname, '../'), // adjust if needed
  },
  watchFolders: [path.resolve(__dirname, '../')],
  // some versions of react-native-monorepo-config need this explicitly:
  projectRoot: __dirname,
  dirname: __dirname,
});

config.resolver.unstable_enablePackageExports = true;

module.exports = config;
