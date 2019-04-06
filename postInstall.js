/* eslint-disable */
const spawnSync = require('child_process').spawnSync;
const path = require('path');
const fs = require('fs');

const main = function(){
  setupGitRepo();
  const pkgJsonPath = getPkgJsonPath();
  if (fs.existsSync('./__tests__/App-test.js')) {
    fs.unlinkSync(path.resolve(process.cwd(), '__tests__', 'App-test.js'))
  }
  if (fs.existsSync(pkgJsonPath)) {
    modifyPackageJson(pkgJsonPath);
  }
}

const setupGitRepo = function(){
  spawnSync("git" , ["init"], {stdio: 'inherit'});
  spawnSync("npm" , ["install", "husky", "--save"], {stdio: 'inherit'});
}

const getPkgJsonPath = function() {
  return path.resolve(
    process.cwd(),
    'package.json',
  );
};

const modifyPackageJson = function(path) {
  let packageJson = require(path);
  packageJson.scripts = {
    "release": "node node_modules/react-native/local-cli/cli.js run-android --variant=release",
    "debug": "node node_modules/react-native/local-cli/cli.js run-android",
    "clean": "cd android && gradlew clean && cd ..",
    "build:dev": "npm run clean && npm run debug",
    "build:release": "npm run clean && npm run release",
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest",
    "test:snap": "npm run test -- -u",
    "test:watch": "npm test -- --watch",
    "test:coverage": "npm test -- --coverage",
    "lint": "eslint src/**/*.js",
    "lint:fix": "npm run lint -- --fix"
  }
  packageJson.nyc = {
    "functions": 80,
    "lines": 80,
    "check-coverage": true,
    "reporter": [
      "lcov"
    ],
    "include": [
      "src/**/*.js"
    ],
    "exclude": [
      "**/*.test.js",
      "build",
      "src/store.js",
      "src/utils/*",
      "src/assets/*"
    ]
  }
  packageJson.jest = {
    "preset": "react-native",
    "setupFilesAfterEnv": [
      "<rootDir>/jestSetup.js"
    ],
    "transform": {
      "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
    },
    "transformIgnorePatterns": [
      "node_modules/(?!(jest-)?react-native|react-navigation|@react-navigation)"
    ],
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}",
      "!<rootDir>/node_modules/",
      "!<rootDir>/src/assets/",
      "!<rootDir>/src/utils/*",
      "!<rootDir>/src/store.js"
    ]
  }

  fs.writeFile(path, JSON.stringify(packageJson, null, 2), function (err) {
    if (err) return console.log('\n* Setup package.json: [FAIL]\n', err);
    console.log('\n* Setup package.json: [DONE]\n');
  });
}

main();
