// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// ✅ Allow .cjs files (CommonJS support for Firebase)
config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes('cjs')) {
    config.resolver.sourceExts.push('cjs');
}

// ✅ Disable strict export map enforcement
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
