const fs = require('fs');
const core = require('@actions/core');
const setVersion = require('./set-version');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const cargoFile = core.getInput('cargoFile');
    const version = core.getInput('version');
    const buildNumberOnly = core.getInput('buildNumberOnly');
    const overwriteCargoFile = core.getInput('overwriteCargoFile');
    core.info(`Running with ${cargoFile} ${version} ${buildNumberOnly}`);
    const result = setVersion(fs.readFileSync(cargoFile).toString(), version, buildNumberOnly);
    
    if (overwriteCargoFile) {
      fs.writeFileSync(cargoFile, result.content);
    }
    
    core.setOutput('content', result.content);
    core.setOutput('version', result.version);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
