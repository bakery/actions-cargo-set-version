const fs = require('fs');
const core = require('@actions/core');
const setVersion = require('./set-version');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const cargoFile = core.getInput('cargoFile');
    const version = core.getInput('version');
    const buildNumberOnly = core.getInput('buildNumberOnly');
    core.info(`Running with ${cargoFile} ${version} ${buildNumberOnly}`);
    core.setOutput('content', setVersion(fs.readFileSync(cargoFile).toString(), version, buildNumberOnly));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
