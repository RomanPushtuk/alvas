const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './'
});
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  modulePathIgnorePatterns: ["<rootDir>/app/api"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
module.exports = createJestConfig(customJestConfig);
