// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/',
            destination: 'http://localhost:3000/',
          },
          {
            source: '/api/:lookup*',
            destination: 'http://localhost:3000/:lookup*',
          },
        ]
      },
  };