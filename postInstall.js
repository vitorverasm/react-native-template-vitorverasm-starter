/* eslint-disable */
const spawnSync = require('child_process').spawnSync;
const path = require('path');
const fs = require('fs');

const main = function(){
  setupGitRepo();
  if (fs.existsSync('./__tests__/App-test.js')) {
    fs.unlinkSync(path.resolve(process.cwd(), '__tests__', 'App-test.js'))
  }
}

const setupGitRepo = function(){
  spawnSync("git" , ["init"], {stdio: 'inherit'});
  spawnSync("npm" , ["install", "husky", "--save"], {stdio: 'inherit'});
}

main();
