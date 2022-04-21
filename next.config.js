// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:w*',
            destination: 'http://localhost:3000/:w*',
          },
        ]
      },
  };