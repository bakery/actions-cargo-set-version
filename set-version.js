const versionStringRx = /\d+(\.\d+){2,}/ig;

let setVersion = function (fileContent, version) {
  if (!version || !version.match(versionStringRx)) {
    throw new Error('Invalid version string');
  }

  const lines = fileContent.split('\n');
  const versionLine = lines.find(l => l.match(/^version\s*=\s*/ig));
  let currentVersion = versionLine.match(versionStringRx);
  currentVersion = currentVersion && currentVersion[0];
  return lines.map(l => {
    return l === versionLine ? versionLine.replace(currentVersion, version) : l;
  }).join('\n');
};

module.exports = setVersion;
