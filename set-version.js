const versionStringRx = /\d+(\.\d+){2,}/ig;

let setVersion = function (fileContent, version, buildNumberOnly = false) {
  if (!buildNumberOnly) {
    if (!version || !version.match(versionStringRx)) {
      throw new Error('Invalid version string');
    }
  } else {
    if (!version || !version.match(/^[0-9]+$/ig)) {
      throw new Error('Invalid version string');
    }
  }
  
  const lines = fileContent.split('\n');
  const versionLine = lines.find(l => l.match(/^version\s*=\s*/ig));
  let currentVersion = versionLine.match(versionStringRx);
  currentVersion = currentVersion && currentVersion[0];
  return lines.map(l => {
    if (l !== versionLine) {
      return l;
    }

    const newVersion = !buildNumberOnly ? version : currentVersion.replace(/[0-9]+$/, version);

    return versionLine.replace(currentVersion, newVersion);
  }).join('\n');
};

module.exports = setVersion;
