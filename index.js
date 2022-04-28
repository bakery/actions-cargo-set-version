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
    const result = setVersion(fs.readFileSync(cargoFile).toString(), version, buildNumberOnly);
    core.setOutput('content', result.content);
    core.setOutput('version', result.version);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
