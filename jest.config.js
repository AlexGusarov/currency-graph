module.exports = {
  clearMocks: true,

  rootDir: './',

  testEnvironment: 'jsdom',

  //   setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
};
