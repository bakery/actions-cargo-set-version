const setVersion = require('./set-version');
const process = require('process');
const cp = require('child_process');
const path = require('path');
const fs = require('fs');

test('setVersion works', () => {
  expect(setVersion(fs.readFileSync('./fixtures/Cargo.toml').toString(), '0.24.4778923')).toEqual({
    content: fs.readFileSync('./fixtures/Cargo.patched.toml').toString(),
    version: '0.24.4778923'
  });

  expect(setVersion(`
version = "0.24.0"
`, '1.0.1', false)).toEqual({
  content: `
version = "1.0.1"
`, version: '1.0.1' 
});

  expect(setVersion(`
version = "0.24.0"
`, '0.24.4778923')).toEqual({
  content: `
version = "0.24.4778923"
`, version: '0.24.4778923'
});

  expect(setVersion(`
version = "0.24.4778923"
`, '0.24.0')).toEqual({
  content: `
version = "0.24.0"
`, version: '0.24.0'
});

  expect(setVersion(`
version="0.24.0"
`, '0.24.4778923')).toEqual({
  content: `
version="0.24.4778923"
`, version: '0.24.4778923'
});

expect(setVersion(`
version="0.24.0"
`, '4778923', true)).toEqual({
  content: `
version="0.24.4778923"
`, version: '0.24.4778923'
});
});

test('setVersion throws when version string is invalid', () => {
  expect(() => setVersion(fs.readFileSync('./fixtures/Cargo.toml').toString(), 'this is not a valid version string')).toThrowError('Invalid version string');
});

test('test runs', () => {
  process.env['INPUT_CARGOFILE'] = './fixtures/Cargo.toml';
  process.env['INPUT_VERSION'] = '1.0.1';
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log(result);
})
