/**
 * @file scripts/patch-expo-metro.js
 * @description Automatically patches @expo/cli createMetroMiddleware to handle non-ASCII/Unicode
 * characters (such as Vietnamese diacritics in folder paths like "Thạc sĩ") in HTTP response headers.
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.join(
  __dirname,
  '..',
  'node_modules',
  '@expo',
  'cli',
  'build',
  'src',
  'start',
  'server',
  'metro',
  'dev-server',
  'createMetroMiddleware.js'
);

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, 'utf8');

  const unpatchedRegex = /res\.setHeader\(["']X-React-Native-Project-Root["'],\s*metroConfig\.projectRoot\);/;
  const patchedTarget = 'res.setHeader("X-React-Native-Project-Root", encodeURI(metroConfig.projectRoot || ""));';

  if (unpatchedRegex.test(content)) {
    content = content.replace(unpatchedRegex, patchedTarget);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('[patch-expo-metro] Successfully applied UTF-8 header patch for projectRoot.');
  } else {
    console.log('[patch-expo-metro] File is already patched or up to date.');
  }
}
