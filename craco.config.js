const path = require(`path`)

module.exports = {
  webpack: {
    alias: {
      'app': path.resolve(__dirname, 'src/app'),
      'shared': path.resolve(__dirname, 'src/shared'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'features': path.resolve(__dirname, 'src/features'),
      'ui': path.resolve(__dirname, 'src/shared/ui')
    }
  }
}