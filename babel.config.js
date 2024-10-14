module.exports = function (api) {
  const output = {
    presets: ['@babel/preset-react'],
    plugins: [
      ['@babel/plugin-proposal-export-namespace-from'],
      ['@babel/plugin-proposal-optional-chaining'],
      [
        'babel-plugin-root-import',
        {
          paths: [
            { dirName: '' },
            { dirName: 'components' },
            { dirName: 'routers', parent: 'components' },
            { dirName: 'pages', parent: 'components' },
            { dirName: 'widgets', parent: 'components' },
          ].map((dir) => ({
            rootPathSuffix: ['.', 'src', dir?.parent, dir.dirName].filter((e) => e).join('/'),
            rootPathPrefix: `#${dir.dirName}/`,
          })),
        },
      ],
    ],
  };

  const babelEnv = api.env();
  if (babelEnv !== 'development' || process.env.NODE_ENV === 'production' || process.env.BABEL_ENV === 'production') {
    output.plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }]);
  }

  return output;
};
