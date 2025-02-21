module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/edit",
        permanent: true,
      },
    ];
  },
};
