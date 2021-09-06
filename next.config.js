const {rewrites} = require("./next.config");
module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: `http://localhost:8800/:slug*`,
      },
    ]
  }
}
