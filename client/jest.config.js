module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleDirectories: [
    'node_modules',
    'src', // add this if your @mui/styles module is within the src directory
  ],
  modulePaths: [
    '<rootDir>/node_modules',
    '<rootDir>/src', // add this if your @mui/styles module is within the src directory
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
