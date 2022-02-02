/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const removeImports = require("next-remove-imports")({
  options: { },
});

module.exports = removeImports()