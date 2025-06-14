/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // 👇 Esto permite mockear imports de CSS y similares
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // 👇 Esto transforma tu JSX con Babel
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};

module.exports = config;