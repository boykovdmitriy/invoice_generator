async function loadTailwindPlugin() {
  try {
    const plugin = await import('prettier-plugin-tailwindcss')
    return plugin.default
  } catch (error) {
    console.error('Failed to load prettier-plugin-tailwindcss:', error)
    return null
  }
}
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: [loadTailwindPlugin()],
}
