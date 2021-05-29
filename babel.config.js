module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@tailwind': ['./src/utils/tailwind.js'],
            '@screens': ['./src/screens'],
            '@components': ['./src/components'],
            '@utils': ['./src/utils'],
            '@store': ['./src/store'],
            '@assets': ['./assets'],
          },
        },
      ],
    ],
  };
};
