module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  assets: ['./src/assets/fonts'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
