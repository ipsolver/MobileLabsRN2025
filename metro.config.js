// Імпортуємо getDefaultConfig з пакету expo
const { getDefaultConfig } = require("expo/metro-config");

// Отримуємо налаштування за замовчуванням для Expo
const defaultConfig = getDefaultConfig(__dirname);

// Додаємо ".cjs" розширення до списку оброблюваних
defaultConfig.resolver.sourceExts.push("cjs");

// Вимикаємо unstable_enablePackageExports (для старих версій)
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
